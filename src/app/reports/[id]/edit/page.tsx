import EditForm from "@/components/EditForm";
import { getReport } from "@/lib/report";

interface EditReportPageProps {
  params: Promise<{
    id: string
  }>;
}

const EditReportPage = async ({ params }: EditReportPageProps) => {
  const { id: reportId } = await params;
  const initialData = await getReport(reportId);
  return (
    <EditForm reportId={reportId} initialData={initialData} />
  );
}

export default EditReportPage;
