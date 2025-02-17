import React from "react";
import { useAuth } from "../../hooks/Auth.hooks";
import { BgPattern } from "./BgPattern";
import { NavigationLink } from "./NavigationLink";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div className="h-screen sticky left-0 w-[25vw] bg-blue-1 text-white-1 flex flex-col pt-[12vh] pb-[7vh] top-0 overflow-hidden">
      <nav className=" h-full flex flex-col justify-between">
        <ul className="flex flex-col gap-10 pr-[92px]">
          <li className="text-subtitle-2">
            <NavigationLink path="/home">Inicio</NavigationLink>
          </li>
          <li className="text-subtitle-2">
            <NavigationLink path="/">Transferir</NavigationLink>
          </li>
          <li className="text-subtitle-2">
            <NavigationLink path="/">Recargar</NavigationLink>
          </li>
          <li className="text-subtitle-2">
            <NavigationLink path="/exchange">Intercambiar</NavigationLink>
          </li>
          <li className="text-subtitle-2">
            <NavigationLink path="/">Perfil</NavigationLink>
          </li>
          <li className="text-subtitle-2">
            <NavigationLink path="/">Ayuda</NavigationLink>
          </li>
        </ul>
        <button
          className="text-subtitle-2 cursor-pointer w-fit pl-20"
          onClick={() => logout()}
        >
          Cerrar sesión
        </button>
      </nav>
      <BgPattern />
    </div>
  );
};

export default Sidebar;
