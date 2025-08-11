import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface DateRangeInputProps {
  label: string;
  isRequired?: boolean;
  startDateRegister: ReturnType<UseFormRegister<any>>;
  endDateRegister: ReturnType<UseFormRegister<any>>;
  startDateError?: string;
  endDateError?: string;
};

const DateRangeInput = ({
  label,
  isRequired,
  startDateRegister,
  endDateRegister,
  startDateError,
  endDateError,
}: DateRangeInputProps) => {
  return (
    <div>
      <Label text={label} isRequired={isRequired} />
      <div className="mt-1 flex space-x-4">
        <input
          type="date"
          {...startDateRegister}
          // className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        />
        <span className="self-center">〜</span>
        <input
          type="date"
          {...endDateRegister}
          // className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        />
      </div>
      <ErrorMessage message={startDateError} />
      <ErrorMessage message={endDateError} />
    </div>
  );
};

export default DateRangeInput;