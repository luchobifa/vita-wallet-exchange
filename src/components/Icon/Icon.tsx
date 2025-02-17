import React, { FC, SVGProps } from "react";
import { iconType } from "./types";
import { iconsLibrary } from "./Library";

interface IconProps extends SVGProps<SVGSVGElement> {
  type: iconType;
}

const Icon: FC<IconProps> = ({ type, ...props }) => {
  const IconComponent = iconsLibrary[type];
  return React.cloneElement(IconComponent, { ...props });
};

export default Icon;
