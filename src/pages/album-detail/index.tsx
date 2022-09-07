import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RmTable from "~/components/table";
import { myAxios } from "~/http";
import { setPlaySongList$ } from "~/states/player";
import { RespSongInfo } from "~/types";
import { parseSongInfo } from "~/utils";

export default function AlbumDetail() {
  const [result, setResult] = useState<{
    resourceState: boolean;
    album: {
      name: string;
      alias: string[];
      picUrl: string;
      blurPicUrl: string;
      publishTime: number;
      subType: string;
      type: string;
      transNames: string[];
      tags: string;
      size: number;
      paid: boolean;
      onSale: boolean;
      info: {
        commentCount: number;
        liked: boolean;
        shareCount: number;
      };
      company: string;
      artist: {
        name: string;
        id: number;
      };
      description: string;
    };
    songs: RespSongInfo[];
  }>();
  const [params] = useSearchParams();

  useEffect(() => {
    myAxios({
      url: `/album?id=${params.get("id")}`,
    }).then((res) => {
      setResult(res);
    });
  }, [params]);

  const setPlayList = useSetAtom(setPlaySongList$);
  const play = (item: RespSongInfo) => {
    setPlayList({
      active: item.id,
      list: result!.songs.map((song) => ({
        ...parseSongInfo(song),
        markForPlay: -1,
        playingTime: -1,
      })),
    });
  };

  return (
    <div className="">
      {result && (
        <>
          <div className="">
            <img className="square-10" src={result.album.picUrl} alt="cover" />
          </div>
          <RmTable head={["名称"]} empty={!result.album.size}>
            <tbody>
              {result.songs.map((item) => (
                <tr key={item.id}>
                  <td onClick={() => play(item)}>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </RmTable>
        </>
      )}
    </div>
  );
}
