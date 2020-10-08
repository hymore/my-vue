import { isObject, def } from "../util/index";
import { arrayMethods } from "../arrayMethods.js";
class Observer {
  constructor(value) {
    // value.__ob__ = this;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      // 不要对数字的索引进行观测
      value.__proto__ = arrayMethods;
      this.observerArray(value);
    } else this.walk(value);
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }
}
function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newVal) {
      if (newVal == value) return;
      observe(newVal);
      value = newVal;
    },
  });
}
export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  return new Observer(data); //用来观测数据
}
