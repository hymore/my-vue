import { Watcher } from "./observe/watcher";
import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;

  // 渲染页面
  let updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, () => {}, true); // 渲染watcher
}
