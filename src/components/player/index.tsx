import "./index.scss";

import { useAtomValue } from "jotai";

import { playList$ } from "~/states/player";

import Dropdown from "../dropdown";

export default function Player() {
  const playlist = useAtomValue(playList$);
  return (
    <div className="rm-player fixed bottom-0 right-0 bg-white">
      <Dropdown trigger="播放列表" position={["top", "right"]}>
        <ul>
          {playlist.map((song) => (
            <li className={`${song.active && "bg-cyan-300"} p-2`} key={song.id}>
              {song.name}
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
