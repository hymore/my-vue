import { Watcher } from "./observe/watcher";
import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  callHook(vm, "beforeMount");

  vm.$el = el;
  // 渲染页面
  let updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, () => {}, true); // 渲染watcher

  callHook(vm, "mounted");
}

export function callHook(vm, hook) {
  const handers = vm.$options[hook];
  if (handers) {
    for (let i = 0; i < handers.length; i++) {
      handers[i].call(vm);
    }
  }
}
