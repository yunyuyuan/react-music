import "./index.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateEffect } from "react-use";

import SvgIcon from "~/components/SvgIcon";
import RmTable from "~/components/table";
import { atomAxios } from "~/http";
import { searchType, searchTypeKeys } from "~/http/netease/search";
import { duration2Time } from "~/utils";

const searchReq = atomAxios();

export default function Search() {
  const [searchFocus, setFocus] = useState(false);
  const [searching, setSearching] = useState(false);

  const [searchVal, setSearchVal] = useState("");
  const [selectedType, setSearchType] = useState<number>(1);
  const [result, setResult] = useState<any>({});

  const searchFn = () => {
    if (searching || !searchVal) return;
    setSearching(true);
    searchReq({
      url: `/search?keywords=${searchVal}&type=${selectedType}`,
    })
      .then((res) => {
        console.log(res);
        if (!res.dirty) {
          setSearching(false);
          setResult(res.data.result);
        }
      })
      .catch(() => {
        setSearching(false);
      });
  };

  useUpdateEffect(searchFn, [selectedType]);

  return (
    <div className="rm-search my-20">
      <div
        className={`head rm-transition mx-auto flex w-[600px] items-stretch justify-center rounded-xl 
                      border border-slate-400 bg-white hover:border-cyan-400 ${
                        searchFocus && "active"
                      }`}
      >
        <select
          className="rounded-l-xl bg-slate-100 px-2 text-sm"
          title="搜索类型"
          value={selectedType}
          onChange={({ currentTarget }) => {
            setResult({});
            setSearchType(+currentTarget.value);
          }}
        >
          {searchTypeKeys.map((key) => (
            <option key={key} value={searchType[key].key}>
              {searchType[key].label}
            </option>
          ))}
        </select>
        <input
          className="grow border-l p-2"
          placeholder="搜索..."
          value={searchVal}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={({ currentTarget }) => setSearchVal(currentTarget.value)}
          onKeyUp={({ key }) => key.toUpperCase() === "ENTER" && searchFn()}
        />
        <span className="flex cursor-pointer items-center" onClick={searchFn}>
          <SvgIcon
            name={searching ? "s-loading" : "search"}
            className={`mr-3 fill-slate-500 square-4 ${searchFocus && "fill-purple-500"}`}
          />
        </span>
      </div>
      <div className="body mt-10">
        {selectedType === searchType["song"].key && (
          <SongResult loading={searching} result={result} />
        )}
        {selectedType === searchType["singer"].key && (
          <SingerResult loading={searching} result={result} />
        )}
      </div>
    </div>
  );
}

const SongResult = ({
  loading,
  result,
}: {
  loading: boolean;
  result: {
    hasMore: boolean;
    songCount: number;
    songs: {
      id: number;
      name: string;
      alias: string[];
      fee: number;
      album: {
        id: number;
        name: string;
      };
      artists: {
        id: number;
        name: string;
        trans: string;
      }[];
      mvid: number;
      duration: number;
    }[];
  };
}) => {
  return (
    <RmTable
      loading={loading}
      empty={!result.songCount}
      head={["歌名", "歌手", "所属专辑", "时长"]}
    >
      <tbody>
        {result.songs?.map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/song?id=${item.id}`} className="block text-sm">
                {item.name}
              </Link>
            </td>
            <td>
              <span className="text-xs text-gray-800">
                {item.artists.map((a, idx) => (
                  <React.Fragment key={a.id}>
                    <Link to={`/singer?id=${a.id}`}>{a.name}</Link>
                    {idx !== item.artists.length - 1 && "、"}
                  </React.Fragment>
                ))}
              </span>
            </td>
            <td>
              <Link className="text-xs" to={`/album?id=${item.album.id}`}>
                {item.album.name}
              </Link>
            </td>
            <td>
              <span className="text-xs text-gray-600">{duration2Time(item.duration)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </RmTable>
  );
};

const SingerResult = ({
  loading,
  result,
}: {
  loading: boolean;
  result: {
    hasMore: boolean;
    artistCount: number;
    hlWords: string;
    artists: {
      id: number;
      name: string;
      alias: string[];
      albumSize: number;
      img1v1Url: string;
      identityIconUrl: string;
      mvSize: number;
      followed: boolean;
      trans: string;
    }[];
  };
}) => {
  return (
    <RmTable
      loading={loading}
      empty={!result.artistCount}
      head={["头像", "名称", "又名", "专辑数", "MV数", "账号"]}
    >
      <tbody>
        {result.artists?.map((item) => (
          <tr key={item.id}>
            <td>
              <img
                className="rounded-full"
                width="40"
                height="40"
                src={item.img1v1Url + "?param=40y40"}
                alt="avatar"
              />
            </td>
            <td>
              <span className="text-sm">{item.name}</span>
            </td>
            <td>
              <span className="text-ellipsis text-xs">{item.alias.join("、")}</span>
            </td>
            <td className="text-xs">{item.albumSize}</td>
            <td className="text-xs">{item.mvSize}</td>
            <td>
              {item.identityIconUrl && (
                <img className="square-4" src={item.identityIconUrl} alt="account" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </RmTable>
  );
};
