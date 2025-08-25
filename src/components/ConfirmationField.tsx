import { formatNewlines } from "@/utils/stringHelper";
import React from "react";

interface ConfirmationFieldProps {
  label: string;
  value?: string | number | undefined | null;
  isLast?: boolean;
}

const ConfirmationField = ({ label, value, isLast = false }: ConfirmationFieldProps) => {
  return (
    <div className={`grid grid-cols-2 gap-x-4 py-4 ${!isLast ? "border-b border-gray-200" : ""}`}>
      <p className="font-semibold text-gray-700">{label}</p>
      {/* <p className="text-gray-900 whitespace-pre-wrap">{value || "未入力"}</p> */}
      <p className="text-gray-900 whitespace-pre-wrap">{value || "未入力"}</p>
    </div>
  );
};

export default ConfirmationField;
