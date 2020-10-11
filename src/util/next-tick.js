let callbacks= [];
let waiting =false;
function flushCallback(){
    callbacks.forEach(cb=>cb())
    waiting = false;
    callbacks = [];
}
export function nextTick(cb){
    callbacks.push(cb);
    // promise --> mutationObserver --> setImmediate --> setTimeout
    if(waiting === false){

        setTimeout(flushCallback, 0);
        waiting = true;
    }
}