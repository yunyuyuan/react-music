import "./index.scss";

import { NavLink } from "react-router-dom";

import SvgIcon from "../SvgIcon";

type MenuItem = { category: string, tabs: readonly { label: string, url: string, icon: string }[] };
const menuItems: readonly MenuItem[] = [
  {
    category: "探索",
    tabs: [
      {
        label: "推荐",
        url: "/recommend",
        icon: "thumbup"
      }, {
        label: "排行榜",
        url: "/top",
        icon: "rate"
      }
    ]
  },
  {
    category: "我的",
    tabs: [
      {
        label: "喜欢",
        url: "/like",
        icon: "love"
      }, {
        label: "最近",
        url: "/history",
        icon: "history"
      }
    ]
  },
  {
    category: "歌单",
    tabs: [
      {
        label: "我的歌单",
        url: "/my-playlist",
        icon: "album"
      }, {
        label: "收藏歌单",
        url: "/like-playlist",
        icon: "album"
      }
    ]
  }
] as const;

export default function SideBar() {
  return (
    <nav className="rm-sidebar fixed h-full bg-white">
      {menuItems.map(item => (
        <div key={item.category} className="">
          <p className="text-base text-gray-400 ml-3 pt-3.5 pb-2.5">{item.category}</p>
          <ul>
            {item.tabs.map(tab => (
              <li key={tab.url}>
                <NavLink 
                  className={({ isActive }) => `c-transition flex items-center active:text-cyan-500 p-2.5
                                              ${isActive ? " bg-[#74ced7] text-white" : ""}`} 
                  to={tab.url}>
                  <SvgIcon className="aspect-square w-5" name={tab.icon} />
                  <span className="text-sm ml-2">{tab.label}</span>
                </NavLink>
              </li>)
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}