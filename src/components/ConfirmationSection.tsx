import React, { ReactNode } from "react";

interface ConfirmationSectionProps {
  title: string;
  children: ReactNode;
};

const ConfirmationSection = ({ title, children }: ConfirmationSectionProps) => {
  return (
    <section className="rounded-md bg-gray-50 p-6 px-8 shadow-sm">
    {/* <section className="border rounded-md bg-gray-50 p-6 shadow-sm"> */}
      {/* <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2> */}
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
      {children}
    </section>
  );
};

export default ConfirmationSection;