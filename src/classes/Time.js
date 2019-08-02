module.exports = class Time {
  constructor(date) {
    this.date = date;
  }

  getElapsedTime() {
    if (!this.date) return -1;
    const elapsedTime = ((Date.now() - this.date) / 1000).toFixed(1);
    return elapsedTime <= 0 ? 0 : elapsedTime;
  }

  getHumanizedElapsedTime() {
    const seconds = this.getElapsedTime();
    if (seconds < 0) return '?';
    if (seconds < 60) return `${seconds}s`;

    const units = ['h', 'm', 's'];
    return new Date(seconds * 1000)
      .toISOString()
      .substr(11, 8)
      .split(':')
      .map(time => parseInt(time, 10))
      .reduce(
        (hms, time, index) =>
          !hms && !time ? hms : `${hms}${time}${units[index]}`,
        ''
      );
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
