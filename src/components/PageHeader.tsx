import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  isSticky?: boolean;
}

const PageHeader = ({ title, description, actions, isSticky = false }: PageHeaderProps) => {
  return (
    <>
      <div className={`
        flex justify-between items-center mb-6
        ${isSticky ? "sticky top-0 z-50 bg-white/80" : ""}`}>
        <h1 className="text-2xl font-bold flex-shrink-0">{title}</h1>
        {actions && (
          <div className="flex space-x-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
      {description && (
        <div className="bg-blue-100 p-4 rounded-md mb-6" role="alert">
          {description}
        </div>
      )}
    </>
  );
};

export default PageHeader;