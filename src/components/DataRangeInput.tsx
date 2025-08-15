import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { getInputClass } from "@/utils/classHelper";

interface DateRangeInputProps {
  label: string;
  isRequired?: boolean;
  startDateRegister: ReturnType<UseFormRegister<any>>;
  endDateRegister: ReturnType<UseFormRegister<any>>;
  startDateError?: string;
  endDateError?: string;
  className?: string;
  width?: string;
};

const DateRangeInput = ({
  label,
  isRequired,
  startDateRegister,
  endDateRegister,
  startDateError,
  endDateError,
  className,
  width,
}: DateRangeInputProps) => {
  const startDateClass = getInputClass(startDateError, className, width);
  const endDateClass = getInputClass(endDateError, className, width);

  return (
    <div>
      <Label text={label} isRequired={isRequired} />
      <div className="mt-1 flex space-x-4">
        <input
          type="date"
          {...startDateRegister}
          className={startDateClass}
        />
        <span className="self-center">〜</span>
        <input
          type="date"
          {...endDateRegister}
          className={endDateClass}
        />
      </div>
      <ErrorMessage message={startDateError} />
      <ErrorMessage message={endDateError} />
    </div>
  );
};

export default DateRangeInput;