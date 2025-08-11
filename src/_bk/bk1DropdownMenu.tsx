// "use client";

// import { useEffect, useRef, useState } from "react";
// import { HiDotsVertical } from "react-icons/hi";

// interface DropdownMenuProps {
//   onLoadLatest: () => void;
//   disabled: boolean;
// }

// const DropdownMenu = ({ onLoadLatest, disabled }: DropdownMenuProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null); // コンポーネントのDOM要素を参照するためのRef

//   useEffect(() => {
//     // ドキュメント全体へのクリックイベントを監視する関数
//     const handleClickOutside = (event: MouseEvent) => {
//       // ドロップダウンのコンポーネント内をクリックした場合は何もしない
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     // ドロップダウンが開いている場合のみイベントリスナーを設定
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // クリーンアップ関数
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]); // isOpenの状態が変わるたびに実行


//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           // onMouseEnter={() => setIsOpen(true)} // マウスが入ったときにドロップダウンを開く
//           // onMouseLeave={() => setIsOpen(false)} // マウスが外れたときにドロップダウンを閉じる
//           // className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
//           className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
//           aria-expanded={isOpen}
//           // aria-expanded="true"
//           aria-haspopup="true"
//         >
//           <HiDotsVertical className="h-5 w-5" />
//           {/* <HiDotsHorizontal className="h-5 w-5" /> */}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-50 ring-1 ring-gray-200 focus:outline-none z-10">
//           {/* <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"> */}
//           <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//             <button
//               onClick={() => {
//                 onLoadLatest();
//                 setIsOpen(false);
//               }}
//               disabled={disabled}
//               className={`block w-full text-left px-4 py-2 text-sm text-gray-700
//                 ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               role="menuitem"
//             >
//               最新の報告書を読み込む
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;
