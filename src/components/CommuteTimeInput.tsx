import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { getInputClass } from "@/utils/classHelper";

interface CommuteTimeInputProps {
  label: string;
  isRequired?: boolean;
  hoursRegister: ReturnType<UseFormRegister<any>>;
  minutesRegister: ReturnType<UseFormRegister<any>>;
  hoursError?: string;
  minutesError?: string;
  className?: string;
  width?: string;
};

const CommuteTimeInput = ({
  label,
  isRequired,
  hoursRegister,
  minutesRegister,
  hoursError,
  minutesError,
  className,
  width,
}: CommuteTimeInputProps) => {
  const hoursClass = getInputClass(hoursError, className, width);
  const minutesClass = getInputClass(minutesError, className, width);

  return (
    <div className="mt-8 mb-0">
      <Label text={label} isRequired={isRequired} />
      <div className="mt-1 flex space-x-2 items-center">
        <input
          type="number"
          {...hoursRegister}
          className={hoursClass}
        />
        <span className="text-gray-500">時間</span>
        <input
          type="number"
          {...minutesRegister}
          className={minutesClass}
        />
        <span className="text-gray-500">分</span>
      </div>
      <ErrorMessage message={hoursError} />
      <ErrorMessage message={minutesError} />
    </div>
  );
};

export default CommuteTimeInput;