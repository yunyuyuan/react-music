export const searchType = {
  song: {
    label: "单曲",
    key: 1,
  },
  album: {
    label: "专辑",
    key: 10,
  },
  singer: {
    label: "歌手",
    key: 100,
  },
  playList: {
    label: "歌单",
    key: 1000,
  },
  user: {
    label: "用户",
    key: 1002,
  },
  mv: {
    label: "MV",
    key: 1004,
  },
  lyric: {
    label: "歌词",
    key: 1006,
  },
  fm: {
    label: "电台",
    key: 1009,
  },
  video: {
    label: "视频",
    key: 1014,
  },
} as const;

export type SearchTypeKey = keyof typeof searchType;
export const searchTypeKeys = Object.keys(searchType) as SearchTypeKey[];

// export async function search(keyword: string, page: number, type: SearchTypeKey) {}
