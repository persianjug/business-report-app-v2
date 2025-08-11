import Link, { LinkProps } from "next/link";
import React from "react";

type ButtonLinkProps = LinkProps & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "edit" | "danger";
  className?: string;
};

const baseStyles = "font-bold py-2 px-4 rounded-md text-sm shadow-md transition duration-200";

const getVariantStyles = (variant: ButtonLinkProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-indigo-600 hover:bg-indigo-700 text-white";
    case "secondary":
      return "bg-gray-500 hover:bg-gray-700 text-white";
    case "edit":
      return "bg-yellow-500 hover:bg-yellow-600 text-white";
    case "danger":
      return "bg-red-500 hover:bg-red-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-700 text-white";
  }
};

const ButtonLink = ({ children, variant = "secondary", className = "", ...props }: ButtonLinkProps) => {
  const variantStyles = getVariantStyles(variant);
  return (
    <Link
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;