import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  Icon: IconType;
}

const CategoryInput = ({
  label,
  Icon,
  onClick,
  selected,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => {
        onClick(label);
      }}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-neutral-400 transition cursor-pointer ${
        selected ? "border-neutral-600" : "border-neutral-200 select-none"
      }`}
    >
      <div className="flex flex-row justify-evenly items-center">
        <Icon className="text-neutral-600" size={30} />
        <div className="font-semibold select-none">{label}</div>
      </div>
    </div>
  );
};

export default CategoryInput;
