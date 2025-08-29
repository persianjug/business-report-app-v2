import { notFound } from "next/navigation";
import { Report } from "@/types/Report";
import ReportCard from "./ReportCard";
import Pagination from "./Pagination";

interface ReportListProps {
  reports: Report[] | null;
  emptyMessage: string;
  currentPage: number;
  totalPages: number;
}

const ReportsList = ({ reports, emptyMessage, currentPage, totalPages }: ReportListProps) => {
  if (!reports) {
    notFound();
  }

  return (
    <>
      {reports.length > 0 ? (
        <div className="space-y-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">{emptyMessage}</p>
      )}
    </>
  );
}

export default ReportsList;