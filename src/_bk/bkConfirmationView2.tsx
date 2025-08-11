// import React from 'react';
// import { Report } from "@/types/report";

// // 日付フォーマット用のヘルパー関数
// const formatDate = (dateString: string | undefined) => {
//   if (!dateString) return "未入力";
//   const date = new Date(dateString);
//   return date.toLocaleDateString('ja-JP');
// };

// const ConfirmationView: React.FC<{ formData: Report }> = ({ formData }) => {
//   return (
//     <div className="space-y-6 text-gray-700">
//       {/* 業務報告書タイトル */}
//       <h1 className="text-2xl font-bold text-center mb-6">業務報告書</h1>

//       {/* 基本情報セクション */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">基本情報</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold">報告対象期間:</p>
//           <p>{formatDate(formData.startDate)} 〜 {formatDate(formData.endDate)}</p>
//         </div>
//       </section>

//       {/* 顧客情報セクション */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">顧客情報</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold">エンド企業:</p>
//           <p>{formData.customerInfo?.endClient || "未入力"}</p>
//           <p className="font-semibold">上位企業:</p>
//           <p>{formData.customerInfo?.upperClient || "未入力"}</p>
//           <p className="font-semibold">業種:</p>
//           <p>{formData.customerInfo?.industry || "未入力"}</p>
//           <p className="font-semibold">職場最寄駅:</p>
//           <p>{formData.customerInfo?.nearestStation || "未入力"}</p>
//         </div>
//       </section>

//       {/* 案件情報セクション */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">案件情報</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold">案件名:</p>
//           <p>{formData.projectInfo?.projectName || "未入力"}</p>
//           <p className="font-semibold">参画日:</p>
//           <p>{formatDate(formData.projectInfo?.participationDate)}</p>
//           <p className="font-semibold">参画人数:</p>
//           <p>{formData.projectInfo?.numberOfParticipants || "0"}人</p>
//           <p className="font-semibold">通勤時間:</p>
//           <p>{formData.projectInfo?.commuteHours || "0"}時間 {formData.projectInfo?.commuteMinutes || "0"}分</p>
//           <p className="font-semibold">勤務形態:</p>
//           <p>{formData.projectInfo?.workStyle || "未入力"}</p>
//           <p className="font-semibold">ポジション:</p>
//           <p>{formData.projectInfo?.position || "未入力"}</p>
//           <p className="font-semibold">主要技術:</p>
//           <p>{formData.projectInfo?.mainTechnology || "未入力"}</p>
//           <p className="font-semibold">データベース:</p>
//           <p>{formData.projectInfo?.database || "未入力"}</p>
//         </div>
//       </section>

//       {/* ★進捗状況セクションの修正 */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">進捗状況</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold self-start">全体状況:</p>
//           <p className="whitespace-pre-wrap">{formData.overallProgress || "未入力"}</p>
//         </div>

//         <h3 className="font-semibold mt-4 mb-2">タスク一覧:</h3>
//         {formData.tasks && formData.tasks.length > 0 ? (
//           <div className="space-y-4">
//             {formData.tasks.map((task, index) => (
//               <div key={index} className="p-3 border rounded-md bg-white">
//                 <h4 className="font-bold text-lg mb-2">タスク {index + 1}</h4>
//                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//                   <p className="font-semibold self-start">作業名:</p>
//                   <p>{task.taskName || "未入力"}</p>
//                   <p className="font-semibold self-start">状況:</p>
//                   <p className="whitespace-pre-wrap">{task.status || "未入力"}</p>
//                   <p className="font-semibold self-start">課題・問題点:</p>
//                   <p className="whitespace-pre-wrap">{task.problem || "未入力"}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="pl-4">タスクは登録されていません。</p>
//         )}

//         {/* <h3 className="font-semibold mt-4 mb-2">タスク一覧:</h3>
//         {formData.tasks && formData.tasks.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">作業名</th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">状況</th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">課題・問題点</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {formData.tasks.map((task, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{task.taskName || "未入力"}</td>
//                     <td className="px-6 py-4 whitespace-pre-wrap border border-gray-300">{task.status || "未入力"}</td>
//                     <td className="px-6 py-4 whitespace-pre-wrap border border-gray-300">{task.problem || "未入力"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="pl-4">タスクは登録されていません。</p>
//         )} */}

//         <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
//           <p className="font-semibold self-start">今後の予定:</p>
//           <p className="whitespace-pre-wrap">{formData.futurePlans || "未入力"}</p>
//         </div>
//       </section>

//       {/* ★その他セクションの修正 */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">その他</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold self-start">顧客状況:</p>
//           <p className="whitespace-pre-wrap">{formData.otherInfo?.customerStatus || "未入力"}</p>
//           <p className="font-semibold self-start">営業情報:</p>
//           <p className="whitespace-pre-wrap">{formData.otherInfo?.salesInfo || "未入力"}</p>
//           <p className="font-semibold self-start">健康状況:</p>
//           <p className="whitespace-pre-wrap">{formData.otherInfo?.healthStatus || "未入力"}</p>
//           <p className="font-semibold self-start">休暇予定:</p>
//           <p className="whitespace-pre-wrap">{formData.otherInfo?.vacationPlans || "未入力"}</p>
//         </div>
//       </section>

//       {/* ★上司へ相談セクションの修正 */}
//       <section className="border rounded-lg bg-gray-50 p-4 shadow-sm">
//         <h2 className="text-xl font-semibold mb-3 border-b pb-2">上司へ相談</h2>
//         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//           <p className="font-semibold self-start">相談内容:</p>
//           <p className="whitespace-pre-wrap">{formData.consultation || "未入力"}</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ConfirmationView;