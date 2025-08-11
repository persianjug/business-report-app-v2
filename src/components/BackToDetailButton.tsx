"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackToDetailButtonProps {
  onClick?: () => void;
};

const BackToDetailButton = ({ onClick }: BackToDetailButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/reports`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
    >
      詳細へ戻る
    </button>
  );
};

export default BackToDetailButton;
