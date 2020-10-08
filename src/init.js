import Vue from ".";
import { initState } from "./state";
import { compileToFunction } from "./complier/index";
import { mountComponent } from "./lifecycle";
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // 初始化渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = document.querySelector(el);
    const options = vm.$options;
    // 优先级render -- template -- el;
    if (!options.render) {
      if (!options.template && el) {
        let template = el.outerHTML;
        let render = compileToFunction(template);
        options.render = render;
      }
    }
    mountComponent(vm, el);
  };
}
