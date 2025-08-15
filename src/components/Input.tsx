import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { getInputClass } from "@/utils/classHelper";

interface InputProps {
  label: string;
  id: string;
  type?: "text" | "number" | "date" | "email" | "password";
  isRequired?: boolean;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  className?: string;
  width?: string;
};

const Input = ({
  label,
  id,
  type = "text",
  isRequired = false,
  register,
  errorMessage,
  className,
  width,
}: InputProps) => {
  const inputClass = getInputClass(errorMessage, className, width);

  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <input
        id={id}
        type={type}
        {...register}
        className={inputClass}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Input;