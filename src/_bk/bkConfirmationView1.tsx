// import { Report } from "@/types/Report";

// // 日付フォーマット用のヘルパー関数
// const formatDate = (dateString: string) => {
//   if (!dateString) return "未入力";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("ja-JP");
// };

// const ConfirmationView = ({ formData }: {formData: Report}) => {
//   return (
//     <div className="space-y-6 text-gray-700">
//       {/* 基本情報 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">基本情報</h2>
//         <p><strong>報告対象期間:</strong> {formatDate(formData.startDate)} 〜 {formatDate(formData.endDate)}</p>
//       </section>

//       {/* 顧客情報 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">顧客情報</h2>
//         <p><strong>エンド企業:</strong> {formData.customerInfo.endClient || "未入力"}</p>
//         <p><strong>上位企業:</strong> {formData.customerInfo.upperClient || "未入力"}</p>
//         <p><strong>業種:</strong> {formData.customerInfo.industry || "未入力"}</p>
//         <p><strong>職場最寄駅:</strong> {formData.customerInfo.nearestStation || "未入力"}</p>
//       </section>

//       {/* 案件情報 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">案件情報</h2>
//         <p><strong>案件名:</strong> {formData.projectInfo.projectName || "未入力"}</p>
//         <p><strong>参画日:</strong> {formatDate(formData.projectInfo.participationDate)}</p>
//         <p><strong>参画人数:</strong> {formData.projectInfo.numberOfParticipants || "0"}人</p>
//         <p><strong>通勤時間:</strong> {formData.projectInfo.commuteHours}時間 {formData.projectInfo.commuteMinutes}分</p>
//         <p><strong>勤務形態:</strong> {formData.projectInfo.workStyle || "未入力"}</p>
//         <p><strong>ポジション:</strong> {formData.projectInfo.position || "未入力"}</p>
//         <p><strong>主要技術:</strong> {formData.projectInfo.mainTechnology || "未入力"}</p>
//         <p><strong>データベース:</strong> {formData.projectInfo.database || "未入力"}</p>
//       </section>

//       {/* 進捗状況 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">進捗状況</h2>
//         <p><strong>全体状況:</strong><br />{formData.overallProgress || "未入力"}</p>
//         <h3 className="font-semibold mt-4">タスク一覧</h3>
//         {formData.tasks.length > 0 ? (
//           <ul className="list-disc list-inside space-y-4">
//             {formData.tasks.map((task, index) => (
//               <li key={index} className="pl-4">
//                 <strong>タスク {index + 1}:</strong><br />
//                 - **タスク名**: {task.taskName || "未入力"}<br />
//                 - **状況**: {task.status || "未入力"}<br />
//                 - **問題・課題**: {task.problem || "未入力"}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="pl-4">タスクは登録されていません。</p>
//         )}
//         <h3 className="font-semibold mt-4">今後の予定</h3>
//         <p>{formData.futurePlans || "未入力"}</p>
//       </section>

//       {/* その他 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">その他</h2>
//         <p><strong>顧客状況:</strong><br />{formData.otherInfo.customerStatus || "未入力"}</p>
//         <p><strong>営業情報:</strong><br />{formData.otherInfo.salesInfo || "未入力"}</p>
//         <p><strong>健康状況:</strong><br />{formData.otherInfo.healthStatus || "未入力"}</p>
//         <p><strong>休暇予定:</strong><br />{formData.otherInfo.vacationPlans || "未入力"}</p>
//       </section>

//       {/* 上司へ相談 */}
//       <section className="p-4 border rounded-lg bg-gray-50 space-y-2">
//         <h2 className="text-xl font-semibold mb-3">上司へ相談</h2>
//         <p><strong>相談内容:</strong><br />{formData.consultation || "未入力"}</p>
//       </section>
//     </div>
//   );
// };

// export default ConfirmationView;