import { HEADER_NAV } from "../../../constants";

import HeaderLink from "../../Links/HeaderLink";

const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="flex gap-6">
        {HEADER_NAV.map((link) => (
          <HeaderLink key={link.id} to={link.href}>
            <li>{link.title}</li>
          </HeaderLink>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
