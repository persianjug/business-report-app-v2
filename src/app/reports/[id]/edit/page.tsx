import EditForm from "@/components/EditForm";
import { getReport } from "@/lib/report";

const EditReportPage = async ({ params }: { params: { id: string } }) => {
  const { id: reportId } = await params;
  const initialData = await getReport(reportId);
  return (
    <EditForm reportId={reportId} initialData={initialData} />
  );
}

export default EditReportPage;
