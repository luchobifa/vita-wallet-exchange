import { useState } from "react";
import Icon from "./Icon/Icon";
import IconImage from "./Icon/IconImage";
import { CurrencyKeys } from "../types/price";

type Props = {
  id: string;
  name: string;
  value: CurrencyKeys;
  options: CurrencyKeys[];
  onSelect: (selected: CurrencyKeys) => void;
  "aria-label"?: string;
};

export const Selector = ({
  id,
  name,
  value,
  options,
  onSelect,
  "aria-label": ariaLabel,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        id={id}
        name={name}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="py-4 px-3.5 gap-1 flex border border-gray-1 cursor-pointer rounded-md justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconImage type={value} />
        <Icon
          type="select"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={id}
          className="absolute top-full left-0 w-full bg-white border border-gray-1 mt-2 z-10 rounded-md"
        >
          {options.map((option) => (
            <div
              key={option}
              role="option"
              aria-selected={option === value}
              className="py-3 px-6 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                onSelect(option);
                setIsOpen(!isOpen);
              }}
            >
              <IconImage type={option} className="m-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
