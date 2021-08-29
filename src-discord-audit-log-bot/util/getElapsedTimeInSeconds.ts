const MILLISECONDS_IN_SECOND = 1000;

function getElapsedTimeInSeconds(date: Date | null): number {
  if (!date) {
    return -1;
  }

  const elapsedTimeInSeconds =
    (Date.now() - date.getTime()) / MILLISECONDS_IN_SECOND;

  return elapsedTimeInSeconds <= 0 ? 0 : elapsedTimeInSeconds;
}

export { getElapsedTimeInSeconds };
