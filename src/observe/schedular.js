import {nextTick} from '../util/next-tick';
function slushSchedularQueue(){
    queue.forEach(watcher=>{
        watcher.run();
        queue = [];
        has = {};
      })
}
let queue =[];
let has= {};
export function queueWatcher(watcher){
  let id = watcher.id;
  if(has[id] == null){
    has[id] = true;
    queue.push(watcher);
   nextTick(slushSchedularQueue)
  }
}