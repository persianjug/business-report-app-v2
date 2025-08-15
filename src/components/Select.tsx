import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { getInputClass } from "@/utils/classHelper";

interface SelectProps {
  label: string;
  id: string;
  isRequired?: boolean;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  options: string[];
  className?: string;
  width?: string;
};

const Select = ({
  label,
  id,
  isRequired = false,
  register,
  errorMessage,
  options,
  className,
  width,
}: SelectProps) => {
  const inputClass = getInputClass(errorMessage, className, width);

  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <select
        id={id}
        {...register}
        className={inputClass}
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Select;