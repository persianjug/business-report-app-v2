import React from "react";

interface AddTaskButtonProps {
  onClick: () => void;
  disabled: boolean;
};

const AddTaskButton = ({ onClick, disabled }: AddTaskButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded text-sm disabled:bg-gray-400"
    >
      タスク追加
    </button>
  );
};

export default AddTaskButton;
