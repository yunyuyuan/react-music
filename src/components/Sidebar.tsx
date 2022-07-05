import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function SideBar() {
  return (
    <nav className="sidebar fixed h-full">
      <Link to="/search">搜索</Link>
      <Link to="/settings">设置</Link>
    </nav>
  );
}