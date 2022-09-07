export type RespSongInfo = {
  name: string;
  id: number;
  ar: {
    id: number;
    name: string;
  }[];
  alia: string[];
  pop: number;
  fee: number;
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  dt: number;
  noCopyrightRcmd: any;
  mv: number;
};

export type SongInfo = {
  name: string;
  id: number;
  singer: {
    id: number;
    name: string;
  }[];
  alia: string[];
  popular: number;
  fee: number;
  album: {
    id: number;
    name: string;
    picUrl: string;
  };
  duration: number;
  noCopyrightRcmd: any;
  mv: number;
};

export type PlayListSong = SongInfo & {
  active?: boolean;
  /** 最后一次播放时间，用来判断 `上一首歌曲` 按钮该放哪一首 */
  playingTime: number;
  /** 加入稍后播放的时间，用来判断下一首是否播放该歌曲 */
  markForPlay: number;
};

export type OverlayPosition = ("top" | "bottom" | "left" | "right")[];
