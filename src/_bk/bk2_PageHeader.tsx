// "use client";

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
//     <header className={headerClasses}>
//       <div className="flex items-center justify-between max-w-4xl mx-auto">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">{title}</h1>
//           {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
//         </div>
//         <div className="flex items-center space-x-4">
//           {actions}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default PageHeader;