function getTimestampFormat(date: Date | null): string {
  if (!date) {
    return "?";
  }

  return `<t:${Math.floor(date.getTime() / 1000)}:R>`;
}

export { getTimestampFormat };
