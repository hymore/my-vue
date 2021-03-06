(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * 判断是否是对象
   * @param {*} data
   */
  function isObject(data) {
    return _typeof(data) === "object" && data !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        vm[source][key] = newVal;
      }
    });
  }
  var LIFECYCLE_HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestory", "destoryed"];
  var strats = {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      if (strats[key]) return options[key] = strats[key](parent[key], child[key]);

      if (_typeof(parent[key]) === "object" && _typeof(child[key]) === "object") {
        options[key] = _objectSpread2({}, parent[key], {}, child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }

  var oldArrayMethods = Array.prototype;
  var methods = ["push", "pop", "shift", "unshift", "reverse", "splice", "sort"];
  var arrayMethods = Object.create(oldArrayMethods);
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); //调用原生的方法

      var inserted; //当前插入的元素；

      var ob = this.__ob__;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
      }

      if (inserted) {
        ob.observerArray(inserted);
        this.dep.notify();
      }

      return result;
    };
  });

  var id = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // this.subs.push(Dep.target);
        Dep.target.addDep(this);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          watcher.update();
        });
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }]);

    return Dep;
  }();
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // value.__ob__ = this;
      this.dep = new Dep(); //dep用于数组依赖收集

      def(value, "__ob__", this);

      if (Array.isArray(value)) {
        // 不要对数字的索引进行观测
        value.__proto__ = arrayMethods;
        this.observerArray(value);
      } else this.walk(value);
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    var dep = new Dep(); // dep 用于对象收集依赖

    var childOb = observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        // 依赖收集
        if (Dep.target) {
          dep.depend(); // 数组的依赖收集

          if (childOb) {
            childOb.dep.depend(); // 数组里还有数组

            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newVal) {
        if (newVal == value) return;
        observe(newVal);
        value = newVal; // 通知watcher更新

        dep.notify();
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) {
      return;
    }

    return new Observer(data); //用来观测数据
  }

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.computed) ;

    if (opts.watch) ;

    if (opts.data) {
      initData(vm);
    }
  }

  function initData(vm) {
    //   数据初始化
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, "_data", key);
    }

    observe(data);
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

  var ELEMENT_TYPE = 1;
  var TEXT_TYPE = 3;
  function parseHTML(html) {
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    function start(tagName, attrs) {
      //   console.log(("开始标签", tagName), ("属性是", attrs));
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
    }

    function end(tagName) {
      //   console.log("结束标签：", tagName);
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      //   console.log("文本是：", text);
      text = text.replace(/\s/g, "");

      if (text) {
        currentParent.children.push({
          type: TEXT_TYPE,
          text: text
        });
      }
    }

    var root = null,
        currentParent;
    var stack = [];

    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd == 0) {
        // 开始或借宿标签
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);
      var match;

      if (start) {
        match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
      } // 属性解析


      var end, attr;

      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
      }

      if (end) {
        advance(end[0].length);
        return match;
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    var str = "";

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === "style") {
        (function () {
          var obj = {};
          attr.value.split(";").forEach(function (item) {
            var _item$split = item.split(":"),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children.length > 0) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(","));
    } else {
      return false;
    }
  }

  function gen(node) {
    if (node.type === 1) {
      return generate(node);
    } else {
      var text = node.text;
      var tokens = [];
      var match, index;
      var lastIndex = defaultTagRE.lastIndex = 0;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join("+"), ")");
    }
  }

  function generate(el) {
    var code = "_c(\"".concat(el.tag, "\",").concat(el.attrs.length > 0 ? genProps(el.attrs) : "undefined", ",").concat(el.children ? genChildren(el) : "", ")");
    return code;
  }

  function compileToFunction(template) {
    var root = parseHTML(template); //   ast语法书生成render函数

    var code = generate(root);
    var renderFn = new Function("with(this) {return ".concat(code, "}"));
    return renderFn;
  }

  var callbacks = [];
  var waiting = false;

  function flushCallback() {
    callbacks.forEach(function (cb) {
      return cb();
    });
    waiting = false;
    callbacks = [];
  }

  function nextTick(cb) {
    callbacks.push(cb); // promise --> mutationObserver --> setImmediate --> setTimeout

    if (waiting === false) {
      setTimeout(flushCallback, 0);
      waiting = true;
    }
  }

  function slushSchedularQueue() {
    queue.forEach(function (watcher) {
      watcher.run();
      queue = [];
      has = {};
    });
  }

  var queue = [];
  var has = {};
  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      has[id] = true;
      queue.push(watcher);
      nextTick(slushSchedularQueue);
    }
  }

  var id$1 = 0;
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, expOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.id = id$1++;
      this.vm = vm;
      this.callback = callback;
      this.options = options;
      this.depId = new Set();
      this.getter = expOrFn;
      this.deps = [];
      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // watcher保存在Dep.target

        this.getter(); //渲染watcher执行

        popTarget();
      }
    }, {
      key: "update",
      value: function update() {
        // this.get();
        queueWatcher(this);
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depId.has(id)) {
          this.depId.add(id);
          this.deps.push(dep);
          dep.addSub(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    //   判断是更新还是渲染
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode;
      var parentElm = oldElm.parentNode;
      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);
      return el;
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;

    if (typeof tag === "string") {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var newProps = vnode.data || {};
    var el = vnode.el;

    for (var key in newProps) {
      if (key === "style") {
        for (var styleName in newProps.style) {
          el.style[styleName.trim()] = newProps.style[styleName];
        }
      } else if (key === "class") {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      vm.$el = patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    callHook(vm, "beforeMount");
    vm.$el = el; // 渲染页面

    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {}, true); // 渲染watcher

    callHook(vm, "mounted");
  }
  function callHook(vm, hook) {
    var handers = vm.$options[hook];

    if (handers) {
      for (var i = 0; i < handers.length; i++) {
        handers[i].call(vm);
      }
    }
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据劫持
      var vm = this; // 将用户传入的配置和全局的合并

      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, "beforeCreate"); // 初始化状态

      initState(vm);
      callHook(vm, "created"); // 初始化渲染

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var options = vm.$options; // 优先级render -- template -- el;

      if (!options.render) {
        if (!options.template && el) {
          var template = el.outerHTML;
          var render = compileToFunction(template);
          options.render = render;
        }
      }

      mountComponent(vm, el);
    };

    Vue.prototype.$nextTick = nextTick;
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    //   console.log(tag, data, children);
    var key = data.key;
    if (key) delete data.key;

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, key, children, undefined);
  }
  function createTextNode(text) {
    //   console.log(text);
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? "" : _typeof(val) === "object" ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      return render.call(this);
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue); // 初始化全局api

  initGlobalAPI(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
