import Link from "next/link";
import { notFound } from "next/navigation";
import { Report } from "@/types/Report";
import { MouseEvent } from "react";
import DownloadButton from "@/components/DownloadButton";
import api from "@/utils/axios";
import { cookies } from "next/headers";
import axios from "axios";

async function fetchReports(): Promise<Report[]> {
  try {
    const res = await api.get<Report[]>('/reports', { cache: 'no-store' });
    return res.data;
  } catch (error) {
    console.error('APIから報告書を取得できませんでした:', error);
    notFound();
  }

  // try {
  //   const res = await api.get<Report[]>("http://localhost:8080/api/reports", {
  //     headers: {
  //       Authorization: `Bearer ${token}`, // Authorizationヘッダーにトークンを手動で設定
  //     },
  //     cache: "no-store"
  //   });
  //   return res.data;
  // } catch (error) {
  //   console.error("APIから報告書を取得できませんでした:", error);
  //   notFound();
  // }
}

// ボタンクリック時のイベントハンドラ
// サーバーサイドで生成されたExcelファイルをダウンロードするため、apiインスタンスを使用するとBlob形式で扱いにくいため、ここではそのままfetchAPIを使用
const handleDownload = async (event: MouseEvent<HTMLButtonElement>, reportId: number) => {
  event.preventDefault(); // リンクへの遷移を防ぐ
  try {
    const response = await fetch(`http://localhost:8080/api/reports/${reportId}/excel`);
    if (!response.ok) {
      throw new Error("Failed to download Excel file");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${reportId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    console.error("Excelファイルのダウンロードに失敗しました:", error);
    alert("Excelファイルのダウンロードに失敗しました。");
  }
};

export default async function ReportsPage() {
  const reports = await fetchReports();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">業務報告書一覧</h1>
      <Link href="/report/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        新規作成
      </Link>

      {reports.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">報告対象期間</th>
                <th className="py-2 px-4 border-b">案件名</th>
                <th className="py-2 px-4 border-b">顧客</th>
                <th className="py-2 px-4 border-b">作成日</th>
                <th className="py-2 px-4 border-b">操作</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                // Linkコンポーネントでラップして行全体をリンクにする
                <tr key={report.id} className="hover:bg-gray-100 cursor-pointer">
                  <td className="py-2 px-4 border-b">
                    <Link href={`/reports/${report.id}`} className="block w-full h-full text-blue-600 hover:underline">
                      {report.id}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/reports/${report.id}`} className="block w-full h-full">
                      {report.reportingPeriod}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/reports/${report.id}`} className="block w-full h-full">
                      {report.projectInfo.projectName}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/reports/${report.id}`} className="block w-full h-full">
                      {report.customerInfo.endClient}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/reports/${report.id}`} className="block w-full h-full">
                      {report.createdAt}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <DownloadButton reportId={report.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">まだ報告書がありません。</p>
      )}
    </div>
  );
}
