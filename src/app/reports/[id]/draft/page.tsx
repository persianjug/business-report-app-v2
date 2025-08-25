import DraftEditForm from "@/components/DraftEditForm";
import { getReport } from "@/lib/report";

const DraftEditReportPage = async ({ params }: { params: { id: string } }) => {
  const { id: reportId } = await params;
  const initialData = await getReport(reportId);
  return (
    <DraftEditForm reportId={reportId} initialData={initialData} />
  );
}

export default DraftEditReportPage;
