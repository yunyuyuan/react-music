import { atom } from "jotai";

import { PlayListSong } from "~/types";

export const playingSong$ = atom<Partial<PlayListSong & { position: number }>>({});

const playList = atom<PlayListSong[]>([]);

export const playList$ = atom((get) =>
  get(playList).map((item) => ({
    ...item,
    active: item.id === get(playingSong$).id,
  }))
);

/**
 * 1. 由 搜索/歌曲详情界面 播放歌曲，仅加入到playlist
 * 2. 由 专辑/歌手/歌单界面 播放歌曲，把整个playlist都替换
 */

/** 歌曲加入到稍后播放，优先级最高 */
export const setAddToPlayList$ = atom(null, (get, set, update: PlayListSong | PlayListSong[]) => {
  console.log(update);
});

/** 由简单界面播放歌曲，仅push进入已有playlist */
export const setPlaySong$ = atom(null, (get, set, update: PlayListSong) => {
  set(playList, get(playList).splice(0, 0, update));
});

/** 由列表播放歌曲，重置playlist */
export const setPlaySongList$ = atom(
  null,
  (
    get,
    set,
    update: {
      list: PlayListSong[];
      active: number;
    }
  ) => {
    set(playList, update.list);
    set(playingSong$, update.list.find((song) => song.id === update.active)!);
  }
);
