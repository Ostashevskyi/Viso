import Logo from "../Logo";

import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  return (
    <header className="flex items-center">
      <Logo />
      <HeaderNavigation />
    </header>
  );
};

export default Header;
