"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return <EmptyState title="Oh no!" subtitle="Something went wrong!" />;
};

export default ErrorState;
