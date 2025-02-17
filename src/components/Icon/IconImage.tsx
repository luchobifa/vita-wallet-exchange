import React, { FC } from "react";
import { iconImageType } from "./types";

interface IconImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  type: iconImageType;
}

const iconPaths: Record<iconImageType, string> = {
  chile: "/assets/currency/chile.png",
  btc: "/assets/currency/btc.png",
  usdt: "/assets/currency/usdt.png",
  usdc: "/assets/currency/usdc.png",
  usd: "",
};

const IconImage: FC<IconImageProps> = ({ type, alt, ...props }) => {
  if (!iconPaths[type]) return <p className="uppercase">{type}</p>;
  return <img src={iconPaths[type]} alt={alt || type} {...props} />;
};

export default IconImage;
