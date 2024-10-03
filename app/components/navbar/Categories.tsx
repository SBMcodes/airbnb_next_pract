"use client";

import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCampfire,
  GiCastle,
  GiCaveEntrance,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { IconType } from "react-icons";

export interface categoryType {
  label: string;
  description: string;
  icon: IconType;
}

export const categoryList: categoryType[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to Beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "You will love the country side!",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "You can go skiing near this property!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "Its a castle!",
  },
  {
    label: "Camping",
    icon: GiCampfire,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "Its in a snowy area!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Its a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Its in a desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Its in the barn area!",
  },
  {
    label: "Luxery",
    icon: IoDiamond,
    description: "Enjoy a luxurious time!",
  },
];

const Categories = () => {
  const pathName = usePathname();

  if (!(pathName === "/")) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categoryList.map((category) => {
          return (
            <CategoryBox
              key={category.label}
              label={category.label}
              description={category.description}
              Icon={category.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
