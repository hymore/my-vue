import { initMixin } from "./init";
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";
import { initGlobalAPI } from "./initGlobalAPI";
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);

// 初始化全局api
initGlobalAPI(Vue);
export default Vue;
