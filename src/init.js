import { initState } from "./state";
import { compileToFunction } from "./complier/index";
import { mountComponent, callHook } from "./lifecycle";
import { mergeOptions } from "./util/index";
import { nextTick } from "./util/next-tick";
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this;

    // 将用户传入的配置和全局的合并
    vm.$options = mergeOptions(vm.constructor.options, options);

    callHook(vm, "beforeCreate");
    // 初始化状态
    initState(vm);

    callHook(vm, "created");
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
  Vue.prototype.$nextTick = nextTick;
}
