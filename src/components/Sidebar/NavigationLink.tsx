import { NavLink } from "react-router";

type Props = {
  children: React.ReactNode;
  path: string;
};

export const NavigationLink = ({ children, path }: Props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "flex items-center bg-blue-2 p-2 pl-20 rounded-tr-[32.5px] py-4 rounded-br-[32.5px]"
          : "flex items-center pl-20"
      }
    >
      {children}
    </NavLink>
  );
};
