// "use client";

// import { useEffect, useState } from "react";
// import { getDraftReports } from "@/lib/report";
// import { Report } from "@/types/Report";
// import ReportList from "@/components/ReportsList";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import NotificationBanner from "@/components/NotificationBanner";
// import Link from "next/link";
// import { FaPlus } from "react-icons/fa";

// const DraftsPage = () => {
//   const [drafts, setDrafts] = useState<Report[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDrafts = async () => {
//       try {
//         const data = await getDraftReports();
//         setDrafts(data);
//       } catch (err) {
//         setError("下書きの取得に失敗しました。");
//         console.error("Failed to fetch drafts:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDrafts();
//   }, []);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <NotificationBanner message={error} type="error" onClose={() => setError(null)} />;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">下書き</h1>
//         <Link href="/reports/create">
//           <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
//             <FaPlus className="mr-2" /> 新規作成
//           </button>
//         </Link>
//       </div>
//       {drafts.length > 0 ? (
//         // <ReportList reports={drafts} isDraftsList={true} />
//         <ReportList reports={drafts} />
//       ) : (
//         <div className="text-center text-gray-500 mt-20">
//           <p>下書き中の報告書はありません。</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DraftsPage;