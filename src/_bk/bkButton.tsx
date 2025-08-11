import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "success";
};

const baseStyles = "font-bold py-2 px-4 rounded-md shadow-md transition duration-200";

const getVariantStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-indigo-600 hover:bg-indigo-700 text-white";
    case "secondary":
      return "bg-gray-500 hover:bg-gray-600 text-white";
    case "danger":
      return "bg-red-500 hover:bg-red-600 text-white";
    case "success":
      return "bg-green-600 hover:bg-green-700 text-white";
    default:
      return "";
  }
};

const Button = ({ children, variant = "primary", className = "", ...props }: ButtonProps) => {
  const variantStyles = getVariantStyles(variant);
  const disabledStyles = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
