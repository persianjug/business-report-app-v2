import { notFound } from "next/navigation";
import CreateReportLinkButton from "./CreateReportLinkButton";
import PageHeader from "./PageHeader";
import { Report } from "@/types/Report";
import ReportCard from "./ReportCard";

interface ReportListProps {
  reports: Report[] | null;
  title: string;
}

const ReportsList = ({ reports, title }: ReportListProps) => {
  if (!reports) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <PageHeader
        title={title}
        actions={<CreateReportLinkButton />}
        isSticky
      />

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">まだ報告書がありません。</p>
      )}
    </div>
  );
}

export default ReportsList;