import { pushTarget, popTarget } from "./dep";
import {queueWatcher} from './schedular';
let id = 0;
export class Watcher {
  constructor(vm, expOrFn, callback, options) {
    this.id = id++;
    this.vm = vm;
    this.callback = callback;
    this.options = options;
    this.depId = new Set();
    this.getter = expOrFn;
    this.deps = [];
    this.get();
  }
  get() {
    pushTarget(this); // watcher保存在Dep.target

    this.getter(); //渲染watcher执行

    popTarget();
  }
  update() {
    // this.get();
    queueWatcher(this);
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depId.has(id)) {
      this.depId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  run(){
    this.get();
  }
}

