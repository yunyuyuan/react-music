import "./App.scss";

import { HashRouter, Route, Routes } from "react-router-dom";

import Player from "~/components/Player";
import SideBar from "~/components/sidebar";
import Search from "~/pages/search";
import Settings from "~/pages/settings";

export default function App() {
  return (
    <HashRouter>
      <SideBar />
      <div className="rm-main-container fixed w-full h-full bg-slate-100">
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
