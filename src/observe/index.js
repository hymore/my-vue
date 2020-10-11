import { isObject, def } from "../util/index";
import { arrayMethods } from "./array.js";
import { Dep } from "./dep";
class Observer {
  constructor(value) {
    // value.__ob__ = this;
    this.dep = new Dep();//dep用于数组依赖收集
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
  let dep = new Dep();// dep 用于对象收集依赖
  let childOb =  observe(value);
  Object.defineProperty(data, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend();
        // 数组的依赖收集
        if(childOb){
          childOb.dep.depend();
          // 数组里还有数组
          if(Array.isArray(value)){
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      if (newVal == value) return;
      observe(newVal);
      value = newVal;
      // 通知watcher更新
      dep.notify();
    },
  });
}
export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  return new Observer(data); //用来观测数据
}
function dependArray(value){
  for(let i = 0 ;i<value.length;i++){
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend();
    if(Array.isArray(current)){
      dependArray(current);
    }
  }
}