import { Link } from "react-router-dom";
import "./Sidebar.scss";
import SvgIcon from "./SvgIcon";

export default function SideBar() {
  return (
    <nav className="rm-sidebar fixed h-full">
      <Link to="/search">{<SvgIcon name="search"/>}搜索</Link>
      <Link to="/settings">{<SvgIcon name="setting"/>}设置</Link>
    </nav>
  );
}