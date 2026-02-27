export default function throttle(fn, rate) {
  const queue = [];
  let currentlyEmptyingQueue = false;

  const emptyQueue = () => {
    if (queue.length) {
      currentlyEmptyingQueue = true;
      setTimeout(() => {
        queue.shift().call();
        emptyQueue();
      }, rate);
    } else {
      currentlyEmptyingQueue = false;
    }
  };

  return function (...args) {
    queue.push(fn.bind(this, ...args));
    if (!currentlyEmptyingQueue) emptyQueue();
  };
}
