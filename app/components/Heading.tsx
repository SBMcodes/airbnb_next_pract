"use client";
import React from "react";

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
  titleTailwindClass?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subTitle,
  center,
  titleTailwindClass,
}) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} select-none`}>
      <div className="text-2xl font-bold">
        <div className={`${titleTailwindClass}`}>{title}</div>
      </div>
      <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
    </div>
  );
};

export default Heading;
