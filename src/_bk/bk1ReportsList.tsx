// import { notFound } from "next/navigation";
// import { getReports } from "@/lib/report";
// import ReportRow from "./ReportRow";
// import CreateReportLinkButton from "./CreateReportLinkButton";
// import PageHeader from "./PageHeader";
// import { Report } from "@/types/Report";

// interface ReportListProps {
//   reports: Report[] | null;
// }

// const ReportsList = ({ reports }: ReportListProps) => {
//   if (!reports) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <PageHeader
//         title={`業務報告書一覧`}
//         description={undefined}
//         actions={<CreateReportLinkButton />}
//         isSticky
//       />

//       {reports.length > 0 ? (
//         <div className="overflow-x-auto rounded-md shadow-md">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left border-b border-gray-200">ID</th>
//                 <th className="py-3 px-6 text-left border-b border-gray-200">報告対象期間</th>
//                 <th className="py-3 px-6 text-left border-b border-gray-200">案件名</th>
//                 <th className="py-3 px-6 text-left border-b border-gray-200">顧客</th>
//                 <th className="py-3 px-6 text-left border-b border-gray-200">作成日</th>
//                 <th className="py-3 px-6 text-left border-b border-gray-200">操作</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm font-light">
//               {reports.map((report) => (
//                 <ReportRow report={report} key={report.id} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-500 mt-4">まだ報告書がありません。</p>
//       )}
//     </div>
//   );
// }

// export default ReportsList;