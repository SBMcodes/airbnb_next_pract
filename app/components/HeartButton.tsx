"use client";

import { User } from "@prisma/client";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
  currentUser?: User | null;
  listingId: string;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <div
      onClick={async (e) => {
        setIsLoading(true);
        await toggleFavourite(e);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }}
      className="relative hover:opacity-80 cursor-pointer transition"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${
          hasFavourited ? "fill-rose-500/90" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
};

export default HeartButton;
