
import { parseHTML } from "./parse-html";
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function genProps(attrs) {
  let str = "";
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach((item) => {
        let [key, value] = item.split(":");
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
function genChildren(el) {
  let children = el.children;
  if (children.length > 0) {
    return `${children.map((c) => gen(c)).join(",")}`;
  } else {
    return false;
  }
}
function gen(node) {
  if (node.type === 1) {
    return generate(node);
  } else {
    let text = node.text;
    let tokens = [];
    let match, index;
    let lastIndex = (defaultTagRE.lastIndex = 0);
    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join("+")})`;
  }
}
function generate(el) {
  let code = `_c("${el.tag}",${
    el.attrs.length > 0 ? genProps(el.attrs) : "undefined"
  },${el.children ? genChildren(el) : ""})`;

  return code;
}
export function compileToFunction(template) {
  let root = parseHTML(template);
  //   ast语法书生成render函数
  let code = generate(root);
  let renderFn = new Function(`with(this) {return ${code}}`);
  return renderFn;
}
