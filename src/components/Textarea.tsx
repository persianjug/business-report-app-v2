import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface TextareaProps  {
  label: string;
  id: string;
  isRequired?: boolean;
  rows?: number;
  register: UseFormRegisterReturn;
  errorMessage?: string;
};

const Textarea = ({
  label,
  id,
  isRequired = false,
  rows = 4,
  register,
  errorMessage,
}: TextareaProps) => {
  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <textarea
        id={id}
        rows={rows}
        {...register}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
      ></textarea>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Textarea;