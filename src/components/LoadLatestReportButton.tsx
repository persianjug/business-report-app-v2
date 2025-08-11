"use client";

import React from "react";

interface LoadLatestReportButtonProps {
  onClick: () => void;
  disabled: boolean;
};

const LoadLatestReportButton = ({ onClick, disabled }: LoadLatestReportButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        font-bold py-2 px-4 rounded-md shadow-md
        ${disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700 text-white"}
      `}
    >
      最新の報告書を読み込む
    </button>
  );
};

export default LoadLatestReportButton;
