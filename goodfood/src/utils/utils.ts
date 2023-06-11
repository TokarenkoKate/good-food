export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const parseDurationToString = (duration: number) => {
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);

  if (minutes !== 0 && hours !== 0) {
    return `${hours} h ${minutes} min`;
  }
  if (minutes !== 0 && hours === 0) {
    return `${minutes} min`;
  }
  return `${hours}h`;
};
