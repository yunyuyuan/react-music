export function duration2Time(duration_: number) {
  const duration = duration_ / 1000;
  let minutes: string | number = Math.floor(duration / 60);
  let seconds: string | number = Math.floor(duration - minutes * 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}
