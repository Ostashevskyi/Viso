import React from "react";

import { NavLink } from "react-router-dom";

type HederLinkProps = {
  children: React.ReactNode;
  to: string;
};

const HeaderLink = ({ children, to }: HederLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-blue-400 hover:text-black/50" : "hover:text-black/50"
      }
    >
      {children}
    </NavLink>
  );
};

export default HeaderLink;
