import { NavLink } from "react-router-dom";
import "./index.scss";
import SvgIcon from "../SvgIcon";

type MenuItem = {category: string, tabs: readonly {label: string, url: string, icon: string}[]};
const menuItems: readonly MenuItem[] = [
  {
    category: "探索",
    tabs:[
      {
        label: "推荐",
        url: "/recommend",
        icon: "search"
      },{
        label: "排行榜",
        url: "/top",
        icon: "search"
      }
    ]
  },
  {
    category: "我的",
    tabs: [
      {
        label: "红心",
        url: "/like",
        icon: "search"
      },{
        label: "最近",
        url: "/history",
        icon: "search"
      }   
    ]
  },
  {
    category: "歌单",
    tabs: [
      {
        label: "我的歌单",
        url: "/my-playlist",
        icon: "search"
      },{
        label: "收藏歌单",
        url: "/like-playlist",
        icon: "search"
      }
    ]
  }
] as const;

export default function SideBar() {
  return (
    <nav className="rm-sidebar fixed h-full">
      {menuItems.map(item => (
        <div key={item.category}>
          <p>{item.category}</p>
          <ul>
            {item.tabs.map(tab => (
              <li key={tab.url}>
                <NavLink className="flex items-center" to={tab.url}>
                  {<SvgIcon className="aspect-square w-6" name={tab.icon}/>}
                  <span className="text-sm">{tab.label}</span>
                </NavLink>
              </li>)
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}