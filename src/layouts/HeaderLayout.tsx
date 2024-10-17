import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const HeaderLayout = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderLayout;
