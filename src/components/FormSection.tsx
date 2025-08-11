import React, { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
};

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <section className="p-8 pt-4 rounded-md shadow-sm bg-gray-50 space-y-6">
      {/* <section className="p-4 border rounded-md shadow-sm bg-gray-50 space-y-6"> */}
      {/* <section className="p-4 border rounded-lg bg-gray-50 space-y-6"> */}
      {/* <h2 className="text-xl font-semibold mb-3 ">{title}</h2> */}
      <h2 className="text-xl font-semibold mb-8 border-b pb-2">{title}</h2>
      {/* <div className="gap-y-4"> */}
        {children}
      {/* </div> */}
    </section>
  );
};

export default FormSection;
