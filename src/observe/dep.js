let id = 0;

export class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  depend() {
    // this.subs.push(Dep.target);
    Dep.target.addDep(this);
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
}

let stack = [];
export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}
