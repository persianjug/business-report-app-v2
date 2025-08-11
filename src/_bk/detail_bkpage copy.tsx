// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import { Report } from '@/types/Report';
// import DeleteButton from '@/components/DeleteButton';
// import api from '@/utils/axios';
// import ConfirmationView from '@/components/ConfirmationView';

// // サーバーコンポーネントでAPIからデータを取得する関数
// async function getReport(id: string): Promise<Report | null> {
//   try {
//     const res = await api.get(`/reports/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error('報告書の取得に失敗しました:', error);
//     return null;
//   }
// }

// // ページのPropsとしてIDを受け取る
// export default async function ReportDetailPage({ params }: { params: { id: string } }) {
//   const reportId = params.id;
//   const report = await getReport(reportId);

//   if (!report) {
//     notFound();
//   }

//   // 報告対象期間を整形
//   const formattedReportingPeriod = `${report.startDate} 〜 ${report.endDate}`;

//   // 通勤時間を整形
//   const formattedCommuteTime = `${report.projectInfo.commuteHours}時間 ${report.projectInfo.commuteMinutes}分`;

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">業務報告書詳細（ID: {report.id}）</h1>
//         <div className="flex space-x-2">
//           <Link href={`/reports/${report.id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md text-sm">
//             編集
//           </Link>
//           <DeleteButton reportId={report.id} />
//           <Link href="/reports" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md text-sm">
//             一覧に戻る
//           </Link>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <ConfirmationView formData={report} />
//       </div>

//       {/* <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//         <section>
//           <h2 className="text-xl font-semibold mb-2">基本情報</h2>
//           <p><strong>報告対象期間:</strong> {formattedReportingPeriod}</p>
//           <p><strong>作成日:</strong> {report.createdAt}</p>
//         </section>

//         <hr />

//         <section>
//           <h2 className="text-xl font-semibold mb-2">顧客情報</h2>
//           <p><strong>エンド企業:</strong> {report.customerInfo.endClient}</p>
//           <p><strong>上位企業:</strong> {report.customerInfo.upperClient || '-'}</p>
//           <p><strong>業種:</strong> {report.customerInfo.industry || '-'}</p>
//           <p><strong>職場最寄駅:</strong> {report.customerInfo.nearestStation || '-'}</p>
//         </section>

//         <hr />

//         <section>
//           <h2 className="text-xl font-semibold mb-2">案件情報</h2>
//           <p><strong>案件名:</strong> {report.projectInfo.projectName}</p>
//           <p><strong>参画日:</strong> {report.projectInfo.participationDate}</p>
//           <p><strong>参画人数:</strong> {report.projectInfo.numberOfParticipants}</p>
//           <p><strong>通勤時間:</strong> {formattedCommuteTime}</p>
//           <p><strong>勤務形態:</strong> {report.projectInfo.workStyle}</p>
//           <p><strong>ポジション:</strong> {report.projectInfo.position}</p>
//           <p><strong>主要技術:</strong> {report.projectInfo.mainTechnology || '-'}</p>
//           <p><strong>データベース:</strong> {report.projectInfo.database || '-'}</p>
//         </section>

//         <hr />

//         <section>
//           <h2 className="text-xl font-semibold mb-2">進捗状況</h2>
//           <p className="whitespace-pre-wrap"><strong>全体状況:</strong> {report.overallProgress}</p>
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">タスク一覧</h3>
//             {report.tasks && report.tasks.length > 0 ? (
//               <ul className="list-disc list-inside space-y-2">
//                 {report.tasks.map((task, index) => (
//                   <li key={index} className="border p-2 rounded-md">
//                     <p><strong>タスク名:</strong> {task.taskName}</p>
//                     <p><strong>状況:</strong> {task.status}</p>
//                     <p><strong>問題・課題:</strong> {task.problem}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>タスクは登録されていません。</p>
//             )}
//           </div>
//           <p className="mt-4 whitespace-pre-wrap"><strong>今後の予定:</strong> {report.futurePlans}</p>
//         </section>

//         <hr />

//         <section>
//           <h2 className="text-xl font-semibold mb-2">その他</h2>
//           <p><strong>顧客状況:</strong> {report.otherInfo.customerStatus || '-'}</p>
//           <p><strong>営業情報:</strong> {report.otherInfo.salesInfo || '-'}</p>
//           <p><strong>健康状況:</strong> {report.otherInfo.healthStatus || '-'}</p>
//           <p><strong>休暇予定:</strong> {report.otherInfo.vacationPlans || '-'}</p>
//         </section>

//         <hr />

//         <section>
//           <h2 className="text-xl font-semibold mb-2">上司への相談</h2>
//           <p className="whitespace-pre-wrap">{report.consultation}</p>
//         </section>
//       </div> */}
//     </div>
//   );
// }