import { Search, ShoppingCart } from "lucide-react";
import { FC } from "react";
import { navList } from "../utils";
import Image from "next/image";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <div>
          <Image src='/assets/BMWLogo.svg' alt="Bmw Logo" width={35} height={35}/>
        </div>
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navList.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray-400 hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Search width={18} height={18} />
          <ShoppingCart width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
