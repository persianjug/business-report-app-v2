
import React from "react";

interface PageDescriptionProps {
  children: React.ReactNode;
}

const PageDescription = ({ children }: PageDescriptionProps) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700  rounded-md p-4 mb-6" role="alert">
      <div>{children}</div>
    </div>
  );
};

export default PageDescription;