// import { ReactNode, useEffect, useState } from "react";

// interface PageHeaderProps {
//   title: string;
//   description?: string;
//   actions?: ReactNode;
//   isSticky?: boolean;
// }

// const PageHeader = ({ title, description, actions, isSticky = false }: PageHeaderProps) => {
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       // ページのスクロール量が10pxを超えたら、isScrolledをtrueに設定
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     // スクロールイベントリスナーを追加
//     window.addEventListener("scroll", handleScroll);

//     // クリーンアップ関数
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const headerClasses = `
//     w-full p-4 transition-all duration-300 ease-in-out
//     ${isSticky ? "sticky top-0 z-50" : ""}
//     ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"}
//   `;

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