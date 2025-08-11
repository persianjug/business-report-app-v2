import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface SelectProps {
  label: string;
  id: string;
  isRequired?: boolean;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  options: string[];
  className?: string;
};

const Select = ({
  label,
  id,
  isRequired = false,
  register,
  errorMessage,
  options,
  className = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white",
}: SelectProps) => {
  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <select id={id} {...register} className={className}>
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