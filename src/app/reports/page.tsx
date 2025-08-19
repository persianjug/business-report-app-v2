import ReportsList from "@/components/ReportsList";
import { getReports } from "@/lib/report";
import { Report } from "@/types/Report";

const ReportsListPage = async () => {
   const reports: Report[] | null = await getReports();

   return (
      <ReportsList reports={reports}  title="業務報告書一覧" />
   )
}

export default ReportsListPage;