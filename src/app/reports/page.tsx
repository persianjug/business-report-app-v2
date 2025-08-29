import CreateReportLinkButton from "@/components/CreateReportLinkButton";
import PageHeader from "@/components/PageHeader";
import ReportsList from "@/components/ReportsList";
import ReportsTabs from "@/components/ReportTabs";
import { Tab } from "@/Constants/reportConstants";
import { getDraftReportsPaginated, getPublishedReportsPaginated, getReportsPaginated } from "@/lib/report";
import { PaginatedReports } from "@/types/Report";

interface ReportsPageProps {
  searchParams: {
    tab?: Tab;
    page?: string;
    limit?: string;
  };
}

const ReportsPage = async ({ searchParams }: ReportsPageProps) => {
  // アクティブにするタブバー設定（デフォルト；すべて）
  const activeTab = await searchParams.tab || "all";
  // ページネーションの表示ページ（デフォルト：1）
  const page = await Number(searchParams.page || 1);
  // ページネーション1ページあたりの明細表示数（デフォルト：2）
  const limit = await Number(searchParams.limit || 2);
  // ページネーション1ページあたりの明細取得開始位置
  const offset = (page - 1) * limit;

  let paginatedReports: PaginatedReports = { reports: [], totalCount: 0 };
  let emptyMessage = "まだ登録済みの報告書はありません。";

  try {
    if (activeTab === "published") {
      console.log(`limit: ${limit} offset: ${offset}`)
      paginatedReports = await getPublishedReportsPaginated({ limit, offset });
    } else if (activeTab === "drafts") {
      paginatedReports = await getDraftReportsPaginated({ limit, offset });
      emptyMessage = "まだ下書き中の報告書はありません。";
    } else {
      paginatedReports = await getReportsPaginated({ limit, offset });    }
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    // エラーハンドリング
    return <p className="text-red-500">データの取得に失敗しました。</p>;
  }

  const reports = paginatedReports.reports;
  const totalPages = Math.ceil(paginatedReports.totalCount / limit);

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
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ReportsPage;
