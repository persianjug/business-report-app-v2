import ReportsList from "@/components/ReportsList";
import { getDraftReports } from "@/lib/report";
import { Report } from "@/types/Report";

const DraftReportsListPage = async () => {
   const reports: Report[] | null = await getDraftReports();

   return (
      <ReportsList reports={reports} title="下書き一覧" />
   )
}

export default DraftReportsListPage;