import React from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info";
}

export const Alert: React.FC<AlertProps> = ({ message, type = "info" }) => {
  let bgColor = "bg-blue-100 text-blue-800";
  if (type === "success") bgColor = "bg-green-100 text-green-800";
  if (type === "error") bgColor = "bg-red-100 text-red-800";

  return <div className={`rounded px-4 py-2 mb-2 ${bgColor}`}>{message}</div>;
};
