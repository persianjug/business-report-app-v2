import { RiErrorWarningLine } from "react-icons/ri";

interface ErrorAlertProps {
  message: string;
  subMessage?: string;
}

const ErrorAlert = ({ message, subMessage }: ErrorAlertProps) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md p-4 mb-6" role="alert">
      <div className="flex items-center">
        <RiErrorWarningLine className="w-5 h-5 mr-2 flex-shrink-0" />
        <p className="font-bold">{message}</p>
      </div>
      {subMessage && <p className="ml-7">{subMessage}</p>}
    </div>
  );
};

export default ErrorAlert;
