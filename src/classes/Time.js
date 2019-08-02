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
    const elapsedTime = (
      (Date.now() - this.date) /
      millisecondsInSecond
    ).toFixed(1);
    return elapsedTime <= 0 ? 0 : elapsedTime;
  }

  getHumanizedElapsedTime() {
    const seconds = this.getElapsedTime();
    if (seconds < 0) return '?';
    if (seconds < 60) return `${seconds}s`;

    return [
      [Math.floor(seconds / secondsInYear), 'y'],
      [Math.floor((seconds % secondsInYear) / secondsInDay), 'd'],
      [Math.floor((seconds % secondsInDay) / secondsInHour), 'h'],
      [Math.floor((seconds % secondsInHour) / secondsInMinute), 'm'],
      [Math.floor(seconds % secondsInMinute), 's']
    ]
      .filter(duration => duration[0])
      .map(duration => `${duration[0]}${duration[1]}`)
      .join('');
  }

  toCleanISOString() {
    return this.date
      ? this.date
          .toISOString()
          .replace('T', ' @ ')
          .replace(/\.\d+Z$/, '')
      : 'Date not found!';
  }
};
