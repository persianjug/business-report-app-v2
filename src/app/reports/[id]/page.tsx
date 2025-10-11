import ReportDetail from "@/components/ReportDetail";
import { getReport } from "@/lib/report";

interface ReportDetailPageProps {
  params: Promise<{
    id: string
  }>;
}

const ReportDetailPage = async ({ params }: ReportDetailPageProps) => {
  const { id: reportId } = await params;
  const report = await getReport(reportId);
  return (
    <ReportDetail reportId={reportId} report={report} />
  );
}

export default ReportDetailPage;
