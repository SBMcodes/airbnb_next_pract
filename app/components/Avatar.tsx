"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  if (src == null) {
    src = "/images/avatar.png";
  }
  return (
    <Image
      className="rounded-full select-none "
      src={src}
      width={30}
      height={30}
      alt="Avatar"
    />
  );
};

export default Avatar;
