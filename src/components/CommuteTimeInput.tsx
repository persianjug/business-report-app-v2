import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface CommuteTimeInputProps {
  label: string;
  isRequired?: boolean;
  hoursRegister: ReturnType<UseFormRegister<any>>;
  minutesRegister: ReturnType<UseFormRegister<any>>;
  hoursError?: string;
  minutesError?: string;
};

const CommuteTimeInput = ({
  label,
  isRequired,
  hoursRegister,
  minutesRegister,
  hoursError,
  minutesError,
}: CommuteTimeInputProps) => {
  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <div className="mt-1 flex space-x-2 items-center">
        <input
          type="number"
          {...hoursRegister}
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span className="text-gray-500">時間</span>
        <input
          type="number"
          {...minutesRegister}
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span className="text-gray-500">分</span>
      </div>
      <ErrorMessage message={hoursError} />
      <ErrorMessage message={minutesError} />
    </div>
  );
};

export default CommuteTimeInput;