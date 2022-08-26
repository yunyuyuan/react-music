import "./index.scss";

import { useAtom } from "jotai";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { activeRoute } from "~/states";

import SvgIcon from "../SvgIcon";

type MenuItem = {
  readonly category: string;
  tabs: readonly { label: string; url: string; icon: string }[];
};
const menuItems: readonly MenuItem[] = [
  {
    category: "探索",
    tabs: [
      {
        label: "搜索",
        url: "/search",
        icon: "search",
      },
      {
        label: "推荐",
        url: "/recommend",
        icon: "thumbup",
      },
      {
        label: "排行榜",
        url: "/top",
        icon: "rate",
      },
    ],
  },
  {
    category: "我的",
    tabs: [
      {
        label: "喜欢",
        url: "/like",
        icon: "love",
      },
      {
        label: "最近",
        url: "/history",
        icon: "history",
      },
    ],
  },
  {
    category: "歌单",
    tabs: [
      {
        label: "我的歌单",
        url: "/my-playlist",
        icon: "album",
      },
      {
        label: "收藏歌单",
        url: "/like-playlist",
        icon: "album",
      },
    ],
  },
] as const;

export default function SideBar() {
  const [active] = useAtom(activeRoute);
  const activePath = useMemo(() => {
    return active.replace(/^(\/[^/]*).*$/, "$1");
  }, [active]);
  return (
    <nav className="rm-sidebar fixed h-full bg-white">
      {menuItems.map((item) => (
        <div key={item.category} className="">
          <p className="ml-3 pt-3.5 pb-2.5 text-base text-gray-400">{item.category}</p>
          <ul>
            {item.tabs.map((tab) => (
              <li key={tab.url} className="px-1">
                <NavLink
                  className={`group rm-transition no-decoration relative my-0.5 flex items-center rounded-xl py-2 pl-5 text-base [&:not(.active)]:hover:text-purple-700
                    ${activePath === tab.url ? "text-white" : ""}`}
                  to={tab.url}
                >
                  <SvgIcon
                    className={`square-[1.3rem] ${activePath === tab.url ? "fill-white" : ""}`}
                    name={tab.icon}
                  />
                  <span
                    className={`ml-3 text-[0.9em] leading-7 ${
                      activePath === tab.url ? "font-semibold" : ""
                    }`}
                  >
                    {tab.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
