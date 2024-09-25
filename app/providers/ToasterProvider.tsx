"use client";

import { Toaster } from "react-hot-toast";

// As its a foregin component which uses client side hooks so
// we need to have at least one parent client component
const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
