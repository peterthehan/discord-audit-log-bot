const SECONDS_IN_YEAR = 31536000;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function humanizeElapsedTime(elapsedTimeInSeconds: number): string {
  if (elapsedTimeInSeconds < 0) {
    return "?";
  }

  if (elapsedTimeInSeconds < 60) {
    return `${elapsedTimeInSeconds.toFixed(1)}s`;
  }

  return [
    {
      time: elapsedTimeInSeconds / SECONDS_IN_YEAR,
      label: "y",
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_YEAR) / SECONDS_IN_DAY,
      label: "d",
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR,
      label: "h",
    },
    {
      time: (elapsedTimeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE,
      label: "m",
    },
    {
      time: elapsedTimeInSeconds % SECONDS_IN_MINUTE,
      label: "s",
    },
  ]
    .map(({ time, label }) => ({ time: Math.floor(time), label }))
    .filter(({ time }) => time)
    .map(({ time, label }) => `${time}${label}`)
    .join(" ");
}

export { humanizeElapsedTime };
