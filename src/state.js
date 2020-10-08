import { observe } from "./observe/index";
import { proxy } from "./util/index";
export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  //   数据初始化
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;

  for (let key in data) {
    proxy(vm, "_data", key);
  }
  observe(data);
}
function initComputed(vm) {}
function initMethods(vm) {}
function initProps(vm) {}
function initWatch(vm) {}
