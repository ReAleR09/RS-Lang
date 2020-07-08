export default class Timers {
  constructor() {
    this.timers = [];
  }

  setNewTimer(callback, time = 0) {
    const timer = setTimeout(callback, time);
    this.timers.push(timer);
  }

  deleteTimers() {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}
