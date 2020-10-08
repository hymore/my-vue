let oldArrayMethods = Array.prototype;

const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "splice",
  "sort",
];
export let arrayMethods = Object.create(oldArrayMethods);

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayMethods[method].apply(this, args); //调用原生的方法
    let inserted; //当前插入的元素；
    let ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }
    if (inserted) {
      ob.observerArray(inserted);
    }
    return result;
  };
});
