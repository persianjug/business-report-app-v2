// クラス生成関数
export const getInputClass = (
  errorMessage: string | undefined,
  className: string | undefined,
  width: string | undefined): string => {
  const widthClass = width ? width : "w-full";
  const baseClass = "mt-1 p-2 block border rounded-md shadow-sm focus:outline-none focus:ring-1";

  const errorStyles = errorMessage
    ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-100/50"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white";

  const combinedClasses = className ? `${baseClass} ${errorStyles} ${className}` : `${baseClass} ${errorStyles}`;

  return `${widthClass} ${combinedClasses}`;
};
