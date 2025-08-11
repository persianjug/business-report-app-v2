import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const CreateReportLinkButton = () => {
  return (
    <Link
      href="/report/create"
      className="inline-flex items-center justify-center font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
                 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
    >
      <FaPlus className="mr-2 h-5 w-5" />
      <span>新規作成</span>
    </Link>
  );
};

export default CreateReportLinkButton;