import ReportDetail from "@/components/ReportDetail";
import { getReport } from "@/lib/report";

const ReportDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id: reportId } = await params;
  const report = await getReport(reportId);
  return (
    <ReportDetail reportId={reportId} report={report} />
  );
}

export default ReportDetailPage;
