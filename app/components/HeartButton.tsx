import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  currentUser?: User | null;
  listingId: string;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const isFav = false;
  const toggleFav = () => {};
  return (
    <div
      onClick={toggleFav}
      className="relative hover:opacity-80 cursor-pointer transition"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${isFav ? "fill-rose-500/90" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
