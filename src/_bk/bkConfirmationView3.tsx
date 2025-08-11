// import React from "react";
// import { FormData } from "@/schemas/reportSchema";
// import ConfirmationField from "./ConfirmationField";
// import ConfirmationSection from "./ConfirmationSection";
// import { TaskTable } from "./TaskTable";

// interface ConfirmationViewProps {
//   formData: FormData;
// }

// // 日付フォーマット用のヘルパー関数
// const formatDate = (dateString: string | undefined) => {
//   if (!dateString) return "未入力";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("ja-JP");
// };

// const ConfirmationView = ({ formData }: ConfirmationViewProps) => {
//   return (
//     <div className="space-y-8 text-gray-700">

//       {/* 基本情報セクション */}
//       <ConfirmationSection title="基本情報">
//         <ConfirmationField
//           label="報告対象期間"
//           value={`${formatDate(formData.startDate)} 〜 ${formatDate(formData.endDate)}`}
//           isLast
//         />
//       </ConfirmationSection>

//       {/* 顧客情報セクション */}
//       <ConfirmationSection title="顧客情報">
//         <ConfirmationField label="エンド企業" value={formData.customerInfo?.endClient} />
//         <ConfirmationField label="上位企業" value={formData.customerInfo?.upperClient} />
//         <ConfirmationField label="業種" value={formData.customerInfo?.industry} />
//         <ConfirmationField label="職場最寄駅" value={formData.customerInfo?.nearestStation} isLast />
//       </ConfirmationSection>

//       {/* 案件情報セクション */}
//       <ConfirmationSection title="案件情報">
//         <ConfirmationField label="案件名" value={formData.projectInfo?.projectName} />
//         <ConfirmationField label="参画日" value={formatDate(formData.projectInfo?.participationDate)} />
//         <ConfirmationField label="参画人数" value={formData.projectInfo?.numberOfParticipants ? `${formData.projectInfo?.numberOfParticipants}人` : "未入力"} />
//         <ConfirmationField label="通勤時間" value={`${formData.projectInfo?.commuteHours || "0"}時間 ${formData.projectInfo?.commuteMinutes || "0"}分`} />
//         <ConfirmationField label="勤務形態" value={formData.projectInfo?.workStyle} />
//         <ConfirmationField label="ポジション" value={formData.projectInfo?.position} />
//         <ConfirmationField label="主要技術" value={formData.projectInfo?.mainTechnology} />
//         <ConfirmationField label="データベース" value={formData.projectInfo?.database} isLast />
//       </ConfirmationSection>

//       {/* 進捗状況セクション */}
//       <ConfirmationSection title="進捗状況">
//         <ConfirmationField label="全体状況" value={formData.overallProgress} />

//         <h3 className="font-semibold mt-6 mb-2">タスク一覧</h3>
//         <TaskTable tasks={formData.tasks || []} />

//         <div className="mt-6">
//           <ConfirmationField label="今後の予定" value={formData.futurePlans} isLast />
//         </div>
//       </ConfirmationSection>

//       {/* その他セクション */}
//       <ConfirmationSection title="その他">
//         <ConfirmationField label="顧客状況" value={formData.otherInfo?.customerStatus} />
//         <ConfirmationField label="営業情報" value={formData.otherInfo?.salesInfo} />
//         <ConfirmationField label="健康状況" value={formData.otherInfo?.healthStatus} />
//         <ConfirmationField label="休暇予定" value={formData.otherInfo?.vacationPlans} isLast />
//       </ConfirmationSection>

//       {/* 上司へ相談セクション */}
//       <ConfirmationSection title="上司へ相談">
//         <ConfirmationField label="相談内容" value={formData.consultation} isLast />
//       </ConfirmationSection>
      
//     </div>
//   );

//   // const renderField = (label: string, value: string | number | undefined, isLast: boolean = false) => (
//   //   <div className={`grid grid-cols-2 gap-x-4 py-4 ${!isLast ? "border-b border-gray-200" : ""}`}>
//   //     <p className="font-semibold text-gray-700">{label}</p>
//   //     <p className="text-gray-900 whitespace-pre-wrap">{value || "未入力"}</p>
//   //   </div>
//   // );

//   // return (
//   //   <div className="space-y-8 text-gray-700">
//   //     {/* 業務報告書タイトル */}

//   //     {/* 基本情報セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">基本情報</h2>
//   //       {renderField("報告対象期間", `${formatDate(formData.startDate)} 〜 ${formatDate(formData.endDate)}`, true)}
//   //     </section>

//   //     {/* 顧客情報セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">顧客情報</h2>
//   //       {renderField("エンド企業", formData.customerInfo?.endClient)}
//   //       {renderField("上位企業", formData.customerInfo?.upperClient)}
//   //       {renderField("業種", formData.customerInfo?.industry)}
//   //       {renderField("職場最寄駅", formData.customerInfo?.nearestStation, true)}
//   //     </section>

//   //     {/* 案件情報セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">案件情報</h2>
//   //       {renderField("案件名", formData.projectInfo?.projectName)}
//   //       {renderField("参画日", formatDate(formData.projectInfo?.participationDate))}
//   //       {renderField("参画人数", formData.projectInfo?.numberOfParticipants ? `${formData.projectInfo?.numberOfParticipants}人` : "未入力")}
//   //       {renderField("通勤時間", `${formData.projectInfo?.commuteHours || "0"}時間 ${formData.projectInfo?.commuteMinutes || "0"}分`)}
//   //       {renderField("勤務形態", formData.projectInfo?.workStyle)}
//   //       {renderField("ポジション", formData.projectInfo?.position)}
//   //       {renderField("主要技術", formData.projectInfo?.mainTechnology)}
//   //       {renderField("データベース", formData.projectInfo?.database, true)}
//   //     </section>

//   //     {/* 進捗状況セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">進捗状況</h2>
//   //       {renderField("全体状況", formData.overallProgress)}

//   //       <h3 className="font-semibold mt-6 mb-2">タスク一覧</h3>
//   //       {formData.tasks && formData.tasks.length > 0 ? (
//   //         <div className="overflow-x-auto">
//   //           <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
//   //             <thead className="bg-gray-200">
//   //               <tr>
//   //                 <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">作業名</th>
//   //                 <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">状況</th>
//   //                 <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">課題・問題点</th>
//   //               </tr>
//   //             </thead>
//   //             <tbody className="bg-white divide-y divide-gray-200">
//   //               {formData.tasks.map((task, index) => (
//   //                 <tr key={index}>
//   //                   <td className="px-4 py-2 border border-gray-300">{task.taskName || "未入力"}</td>
//   //                   <td className="px-4 py-2 whitespace-pre-wrap border border-gray-300">{task.status || "未入力"}</td>
//   //                   <td className="px-4 py-2 whitespace-pre-wrap border border-gray-300">{task.problem || "未入力"}</td>
//   //                 </tr>
//   //               ))}
//   //             </tbody>
//   //           </table>
//   //         </div>
//   //       ) : (
//   //         <p className="pl-4">タスクは登録されていません。</p>
//   //       )}

//   //       <div className="mt-6">
//   //         {renderField("今後の予定", formData.futurePlans, true)}
//   //       </div>
//   //     </section>

//   //     {/* その他セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">その他</h2>
//   //       {renderField("顧客状況", formData.otherInfo?.customerStatus)}
//   //       {renderField("営業情報", formData.otherInfo?.salesInfo)}
//   //       {renderField("健康状況", formData.otherInfo?.healthStatus)}
//   //       {renderField("休暇予定", formData.otherInfo?.vacationPlans, true)}
//   //     </section>

//   //     {/* 上司へ相談セクション */}
//   //     <section className="border rounded-lg bg-gray-50 p-6 shadow-sm">
//   //       <h2 className="text-xl font-semibold mb-4 border-b pb-2">上司へ相談</h2>
//   //       {renderField("相談内容", formData.consultation, true)}
//   //     </section>
//   //   </div>
//   // );
// };

// export default ConfirmationView;