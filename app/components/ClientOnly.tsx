"use client";
import React, { useEffect, useState } from "react";
import useNavMenu from "../hooks/useNavMenu";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const navMenu = useNavMenu();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      onClick={() => {
        if (navMenu.isOpen) {
          navMenu.onClose();
        }
      }}
    >
      {children}
    </div>
  );
};

export default ClientOnly;
