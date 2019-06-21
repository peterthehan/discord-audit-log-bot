module.exports = seconds => {
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
};
