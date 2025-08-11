import { ReactNode } from "react";

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

const DetailSection = ({ title, children }: DetailSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">{title}</h2>
      {children}
    </div>
  );
};

export default DetailSection;
