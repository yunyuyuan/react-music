import "./App.scss";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

import Player from "~/components/Player";
import SideBar from "~/components/sidebar";
import Search from "~/pages/search";
import Settings from "~/pages/settings";
import { activeRoute } from "~/states";

const Main = () => {
  const location = useLocation();
  const [, setActiveRoute] = useAtom(activeRoute);
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);
  return (
    <>
      <SideBar />
      <div className="rm-main-container fixed h-full w-full overflow-y-auto bg-slate-50">
        <Routes>
          <Route path="/">
            <Route index element={<h1>Hello World</h1>} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Player />
      </div>
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}