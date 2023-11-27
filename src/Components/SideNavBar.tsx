import React from 'react';
import { RiHome2Line, RiArticleLine, RiInformationLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const SideNavBar: React.FC = () => {
const navigate = useNavigate();
const handleNavigation = (path: string) => {
  navigate(path);
};
  return (
    <nav style={{zIndex:"100"}} className={"mb-3 w-60 rounded-lg mx-auto border-white border shadow-lg bg-blue-100 transform bg-opacity-50 backdrop-blur-md" }>
      <ul className="flex gap-8 p-2 justify-center align-middle ">
        <li onClick={() => handleNavigation("/Home")} className="text-sm hover:text-white cursor-pointer p-2 bg-opacity-50 hover:bg-blue-500 rounded-lg transition-all">
          <RiHome2Line size={18} />
        </li>
        <li onClick={() => handleNavigation("/Post")} className="text-sm hover:text-white cursor-pointer p-2 bg-opacity-50 hover:bg-blue-500 rounded-lg transition-all">
          <RiArticleLine size={18} />
        </li>
        <li onClick={() => handleNavigation("/Profile")} className="text-sm hover:text-white cursor-pointer p-2 bg-opacity-50 hover:bg-blue-500 rounded-lg transition-all">
          <RiInformationLine size={18} />
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
