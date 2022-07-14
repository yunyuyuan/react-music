import Player from "~/components/Player";
import { HashRouter, Route, Routes } from "react-router-dom";
import Search from "~/pages/search";
import Settings from "~/pages/settings";
import "./App.scss";
import SideBar from "~/components/sidebar";

export default function App() {
  return (
    <HashRouter>
      <SideBar />
      <div className="rm-main-container fixed w-full h-full">
        <Routes>
          <Route path="/">
            <Route index element={<h1>Hello World</h1>} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Player />
      </div>
    </HashRouter>
  );
}