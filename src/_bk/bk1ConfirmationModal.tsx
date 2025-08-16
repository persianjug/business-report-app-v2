// import { ReactNode, useRef, useEffect } from "react";
// import Button from "./Button";

// interface ConfirmationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   children?: ReactNode;
// }

// const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, children }: ConfirmationModalProps) => {
//   const dialogRef = useRef<HTMLDialogElement>(null);

//   // モーダル開閉の制御
//   useEffect(() => {
//     const body = document.body;
//     if (isOpen) {
//       dialogRef.current?.showModal();
//       body.style.overflow = "hidden"; // モーダルが開いたらスクロールを無効化
//     } else {
//       dialogRef.current?.close();
//       body.style.overflow = ""; // モーダルが閉じたらスクロールを元に戻す
//     }
//   }, [isOpen]);

//   return (
//     <dialog
//       ref={dialogRef}
//       // className="backdrop:bg-gray-500/75 rounded-lg shadow-xl p-0 w-full max-w-lg"
//       className="backdrop:bg-gray-500/90 rounded-lg shadow-xl p-0 w-full max-w-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//       onClose={onClose} // Escキーが押されたときにonCloseを呼び出す
//     >
//       <div className="px-6 py-4 border-b border-b-gray-400">
//         <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
//       </div>

//       <div className="px-6 py-4 mt-4">
//         <p className="text-sm">{message}</p>
//         {children}
//       </div>

//       <div className="px-6 py-4 mt-6 sm:flex sm:flex-row-reverse gap-x-6">
//         <Button variant="danger" onClick={onConfirm} className="w-full sm:ml-3 sm:w-auto">削除</Button>
//         <Button variant="outline" onClick={onClose} className="mt-3 w-full sm:mt-0 sm:w-auto">キャンセル</Button>
//       </div>



//       {/* <div className="px-4 pt-5 pb-4 overflow-hidden bg-white sm:p-6">
//         <div className="sm:flex sm:items-start">
//           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>

//             <div className="mt-2">
//               <p className="text-sm text-gray-500">{message}</p>
//               {children}
//             </div>
//           </div>
//         </div>
//       </div> */}
//       {/* <div className="px-6 py-4 bg-gray-50 sm:flex sm:flex-row-reverse">
//         <Button variant="danger" onClick={onConfirm} className="w-full sm:ml-3 sm:w-auto">削除</Button>
//         <Button variant="secondary" onClick={onClose} className="mt-3 w-full sm:mt-0 sm:w-auto">キャンセル</Button>
//       </div> */}
//     </dialog>
//   );
// };

// export default ConfirmationModal;