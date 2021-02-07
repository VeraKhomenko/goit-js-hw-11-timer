const refs = {
  daysRef: document.querySelector('.value[data-value="days"]'),
  hoursRef: document.querySelector('.value[data-value="hours"]'),
  minsRef: document.querySelector('.value[data-value="mins"]'),
  secsRef: document.querySelector('.value[data-value="secs"]'),
};
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.isActive = false;
    this.selector = selector;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  start() {
    this.isActive = true;
    setInterval(() => {
      if (this.isActive) {
        const currentTime = Date.now();
        const deltaTime = this.targetDate - currentTime;

        if (deltaTime <= 0) {
          this.stop();
          return;
        }
        const time = this.getTimeComponents(deltaTime); // на каждую 1000 мс высчитывает разницу между  текущим и стартовым временем и обнговляет кусок интерфейса с помощью функции getTimeComponents(time)
        this.renderTime(time);
      } else {
        return;
      }
    }, 1000);
  }

  renderTime({ days, hours, mins, secs }) {
    refs.daysRef.textContent = days;
    refs.hoursRef.textContent = hours;
    refs.minsRef.textContent = mins;
    refs.secsRef.textContent = secs;
  }

  stop() {
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.renderTime(time);
  }
}

const currentTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01 2022'),
});
currentTimer.start();
