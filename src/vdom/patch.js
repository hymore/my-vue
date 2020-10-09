export function patch(oldVnode, vnode) {
  //   判断是更新还是渲染
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
    return el;
  }
}
function createElm(vnode) {
  let { tag, children, key, data, text } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (let key in newProps) {
    if (key === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName.trim()] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}
