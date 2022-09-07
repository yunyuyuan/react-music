import { SongInfo } from "~/types";
import { RespSongInfo } from "~/types";
export function duration2Time(duration_: number) {
  const duration = duration_ / 1000;
  let minutes: string | number = Math.floor(duration / 60);
  let seconds: string | number = Math.floor(duration - minutes * 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

export function time2Duration(time: string) {
  if (!time) return 0;
  const matcher = time.match(/^(\d+):([\d.]+)$/);
  if (!matcher) return 0;
  return +matcher[1] * 60000 + +matcher[2] * 1000;
}

export function parseSongInfo(info: RespSongInfo): SongInfo {
  return {
    id: info.id,
    name: info.name,
    singer: info.ar,
    alia: info.alia,
    popular: info.pop,
    fee: info.fee,
    album: info.al,
    duration: info.dt,
    noCopyrightRcmd: info.noCopyrightRcmd,
    mv: info.mv,
  };
}
