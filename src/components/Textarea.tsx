import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { getInputClass } from "@/utils/classHelper";

interface TextareaProps {
  label: string;
  id: string;
  isRequired?: boolean;
  rows?: number;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  className?: string;
  width?: string;
};

const Textarea = ({
  label,
  id,
  isRequired = false,
  rows = 4,
  register,
  errorMessage,
  className,
  width,
}: TextareaProps) => {
  const inputClass = getInputClass(errorMessage, className, width);

  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <textarea
        id={id}
        rows={rows}
        {...register}
        className={inputClass}
      ></textarea>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Textarea;