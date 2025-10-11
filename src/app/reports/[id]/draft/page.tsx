import DraftEditForm from "@/components/DraftEditForm";
import { getReport } from "@/lib/report";

interface DraftEditReportPageProps {
  params: Promise<{
    id: string
  }>;
}

const DraftEditReportPage = async ({ params }: DraftEditReportPageProps) => {
  const { id: reportId } = await params;
  const initialData = await getReport(reportId);
  return (
    <DraftEditForm reportId={reportId} initialData={initialData} />
  );
}

export default DraftEditReportPage;
