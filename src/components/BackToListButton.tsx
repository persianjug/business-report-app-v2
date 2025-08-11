"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackToListButtonProps {
  onClick?: () => void;
  // 他の共通propsを追加することも可能です。
};

const BackToListButton = ({ onClick }: BackToListButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/reports");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
    >
      一覧へ戻る
    </button>
  );
};

export default BackToListButton;
