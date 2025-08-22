import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "edit" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: IconType;
  form?: string;
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  icon: Icon,
  form,
}: ButtonProps) => {
  const baseClasses = "flex items-center justify-center font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    edit: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
    outline: "text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500 border border-blue-600",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
      disabled={disabled}
      form={form}
    >
      {Icon && <Icon className="mr-2 h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
