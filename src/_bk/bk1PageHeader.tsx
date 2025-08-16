// import { ReactNode, useEffect, useState } from "react";

// interface PageHeaderProps {
//   title: string;
//   description?: string;
//   actions?: ReactNode;
//   isSticky?: boolean;
// }

// const PageHeader = ({ title, description, actions, isSticky = false }: PageHeaderProps) => {

//   return (
//     <>
//       <div className={`flex justify-between items-center mb-6 ${isSticky ? "sticky top-0 z-10" : ""}`}>
//         <h1 className="text-2xl font-bold flex-shrink-0">{title}</h1>
//         {actions && (
//           <div className="flex space-x-2 flex-shrink-0">
//             {actions}
//           </div>
//         )}
//       </div>
//       {description && (
//         <div className="bg-gray-100 p-4 rounded-md mb-6">
//           <p className="text-gray-700">{description}</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default PageHeader;