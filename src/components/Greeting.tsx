import Icon from "./Icon/Icon";
import { iconType } from "./Icon/types";

type Props = {
  name: string;
  iconImage?: iconType;
};

const Greeting = ({ name, iconImage }: Props) => {
  return (
    <div className="flex items-center">
      {iconImage && <Icon type={iconImage} className="mr-3" />}
      <h3 className="text-subtitle">¡Hola</h3>
      <h3 className="text-subtitle text-blue-gradient ml-2">{`${name}!`}</h3>
    </div>
  );
};

export default Greeting;
