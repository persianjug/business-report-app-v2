import CreateReportLinkButton from "@/components/CreateReportLinkButton";
import PageHeader from "@/components/PageHeader";
import ReportsList from "@/components/ReportsList";
import ReportsTabs from "@/components/ReportTabs";
import { Tab } from "@/Constants/reportConstants";
import { getDraftReports, getPublishedReports, getReports } from "@/lib/report";
import { Report } from "@/types/Report";

interface ReportsPageProps {
  searchParams: {
    tab?: Tab;
  };
}

const ReportsPage = async ({ searchParams }: ReportsPageProps) => {
  const activeTab = await searchParams.tab || "all";
  let reports: Report[] | null = null;
  let emptyMessage = "まだ登録済みの報告書はありません。";

  try {
    if (activeTab === "published") {
      reports = await getPublishedReports();
    } else if (activeTab === "drafts") {
      reports = await getDraftReports();
      emptyMessage = "まだ下書き中の報告書はありません。";
    } else {
      reports = await getReports();
    }
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    // エラーハンドリング
    return <p className="text-red-500">データの取得に失敗しました。</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <PageHeader
        title="業務報告書一覧"
        actions={<CreateReportLinkButton />}
        isSticky
      />
      <ReportsTabs activeTab={activeTab} />
      <ReportsList
        reports={reports}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

export default ReportsPage;
