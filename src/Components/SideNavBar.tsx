import React from 'react';
import { RiHome2Line, RiArticleLine, RiInformationLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';

interface SideNavBarProps {
  smallScreen: boolean;
}

const SideNavBar: React.FC<SideNavBarProps> = ({smallScreen }) => {
const navigate = useNavigate();
const handleNavigation = (path: string) => {
  navigate(path);
};
  return (
    <nav className={"fixed inset-y-0 left-0 bg-opacity-50 w-1/4 transform" }>
      <ul className="flex flex-col gap-4 p-4 mt-10">
        <li onClick={() => handleNavigation("/")} className="text-sm hover:text-blue-500 cursor-pointer">
          <RiHome2Line size={18} />
        </li>
        <li onClick={() => handleNavigation("/Posts")} className="text-sm hover:text-blue-500 cursor-pointer">
          <RiArticleLine size={18} />
        </li>
        <li onClick={() => handleNavigation("/Profile")} className="text-sm hover:text-blue-500 cursor-pointer">
          <RiInformationLine size={18} />
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
