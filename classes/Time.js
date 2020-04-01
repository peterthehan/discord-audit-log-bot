const secondsInYear = 31536000;
const secondsInDay = 86400;
const secondsInHour = 3600;
const secondsInMinute = 60;
const millisecondsInSecond = 1000;

module.exports = class Time {
  constructor(date) {
    this.date = date;
  }

  getElapsedTime() {
    if (!this.date) return -1;

    const elapsedTime = (Date.now() - this.date) / millisecondsInSecond;

    return elapsedTime <= 0 ? 0 : elapsedTime.toFixed(1);
  }

  getHumanizedElapsedTime() {
    const seconds = this.getElapsedTime();
    if (seconds < 0) return '?';
    if (seconds < 60) return `${seconds}s`;

    return [
      { time: seconds / secondsInYear, label: 'y' },
      { time: (seconds % secondsInYear) / secondsInDay, label: 'd' },
      { time: (seconds % secondsInDay) / secondsInHour, label: 'h' },
      { time: (seconds % secondsInHour) / secondsInMinute, label: 'm' },
      { time: seconds % secondsInMinute, label: 's' }
    ]
      .map(({ time, label }) => ({ time: Math.floor(time), label }))
      .filter(({ time }) => time)
      .map(({ time, label }) => `${time}${label}`)
      .join('');
  }

  _addLeadingZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  toLocaleString() {
    if (!this.date) {
      return '?';
    }

    const year = this.date.getFullYear();
    const month = this._addLeadingZero(this.date.getMonth() + 1);
    const date = this._addLeadingZero(this.date.getDate());
    const dateString = `${year}-${month}-${date}`;

    const hours = this._addLeadingZero(this.date.getHours());
    const minutes = this._addLeadingZero(this.date.getMinutes());
    const seconds = this._addLeadingZero(this.date.getSeconds());
    const timeString = `${hours}:${minutes}:${seconds}`;

    const timezone = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.replace(/_/g, ' ');

    return `${dateString} @ ${timeString} (${timezone})`;
  }
};
