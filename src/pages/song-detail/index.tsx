import React from "react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMount } from "react-use";

import { myAxios } from "~/http";
import { RespSongInfo } from "~/types";
import { time2Duration } from "~/utils";

export default function SongDetail() {
  const [params] = useSearchParams();
  const [result, setResult] = useState<
    RespSongInfo & {
      single: number;
      originCoverType: number;
    }
  >();
  const [lyric, setLyric] = useState<
    {
      content: string;
      time: number;
    }[]
  >([]);

  useEffect(() => {
    // 获取音乐信息
    myAxios({
      url: `/song/detail?ids=${params.get("id")}`,
    }).then((res) => {
      console.log(res.songs[0]);
      setResult(res.songs[0]);
    });
  }, [params]);

  useMount(() => {
    // 获取音乐文件
    myAxios({
      url: `/song/url?id=${params.get("id")}`,
    }).then((res) => {
      console.log(res);
    });
    // 获取歌词信息
    myAxios({
      url: `/lyric?id=${params.get("id")}`,
    }).then((res) => {
      console.log(res);
      const lyrics = [];
      for (const lyric of res.lrc.lyric.split("\n")) {
        const matcher = lyric.match(/^\[([\d:.]+)\](.*)$/) as Array<string>;
        if (matcher) {
          const [_, time, content] = matcher;
          lyrics.push({
            time: time2Duration(time),
            content: content || " ",
          });
        }
      }
      setLyric(lyrics);
    });
  });

  return (
    <div className="rm-song-detail flex">
      {result && (
        <>
          <div className="info">
            <div>
              <img className="square-[300px]" src={result.al.picUrl} alt="cover" />
              <h1 className={`${[0, 8].includes(result.fee) ? "" : "after:content-['vip']"}`}>
                {result.name}
                {!!result.alia.length && <span>{result.alia[0]}</span>}
              </h1>
              <label>
                <span>歌手:</span>
                {result.ar.map((a, idx) => (
                  <React.Fragment key={a.id}>
                    <Link to={`/singer?id=${a.id}`}>{a.name}</Link>
                    {idx !== result.ar.length - 1 && "、"}
                  </React.Fragment>
                ))}
              </label>
              <label>
                <span>专辑:</span>
                <Link to={`/album?id=${result.al.id}`}>{result.al.name}</Link>
              </label>
            </div>
          </div>
          <div className="lyric">
            {lyric.map((item) => (
              <div className="my-4" key={item.time}>
                <span className="block text-center">{item.content}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
