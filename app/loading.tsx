import React from "react";
import Loader from "./components/Loader";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Loading;
