// https://gist.github.com/mattheworiordan/1084831
const _ = require("underscore");
module.exports = function throttle(fn, rate) {
  const queue = [];
  let currentlyEmptyingQueue = false;
  
  const emptyQueue = () => {
    if (queue.length) {
      currentlyEmptyingQueue = true;
      _.delay(function() {
        queue.shift().call();
        emptyQueue();
      }, rate);
    } else {
      currentlyEmptyingQueue = false;
    }
  };
  
  return function() {
    // call apply so that we can pass in arguments as parameters as opposed to an array
    queue.push( _.bind.apply(this, [fn, this].concat(Array.from(arguments))) ); 
    if (!currentlyEmptyingQueue) { emptyQueue(); }
  };
};