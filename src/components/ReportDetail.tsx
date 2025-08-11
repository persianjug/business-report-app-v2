"use client";

import { Report } from "@/types/Report";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import ConfirmationView from "@/components/ConfirmationView";
import DropdownMenu from "./DropdownMenu";
import { useReportDetailActions } from "@/hooks/useReportDetailAction";
import { FaFileExcel, FaRegTrashAlt } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import Button from "./Button";
import Link from "next/link";
import DetailItem from "./DetailItem";
import DetailSection from "./DetailSection";

interface ReportDetailProps {
  reportId: string | number;
  report: Report;
}

const ReportDetail = ({ reportId, report }: ReportDetailProps) => {
  const { handleDelete, handleExcelExport } = useReportDetailActions(reportId);

  const dropDownMenuItems = [
    {
      label: "編集",
      href: `/reports/${reportId}/edit`,
      disabled: false,
      isDestructive: false,
      icon: RiPencilLine,
    },
    {
      label: "報告書を削除",
      onClick: handleDelete,
      disabled: false,
      isDestructive: true,
      icon: FaRegTrashAlt,
    },
  ];

  if (!report) {
    notFound();
  }

  // 日付のフォーマット
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "未入力";
    return new Date(dateString).toLocaleDateString("ja-JP");
  };


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">業務報告書詳細（ID: {report.id}）</h1>
        <div className="flex space-x-2">
          <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">
            一覧に戻る
          </Link>
          {/* Excel出力ボタンを単独で配置 */}
          <Button variant="secondary" onClick={handleExcelExport} icon={FaFileExcel}>
            Excel出力
          </Button>
          {/* <ButtonLink href="/reports" variant="secondary">一覧に戻る</ButtonLink> */}
          <DropdownMenu items={dropDownMenuItems} />
        </div>
      </div>

      {/* <div className="space-y-6"> */}
        <ConfirmationView formData={report} isConfirm={false} />
      {/* </div> */}

      {/* <div className="space-y-6 mt-8">
        <DetailSection title="基本情報">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="報告対象期間" value={`${formatDate(report.startDate)} 〜 ${formatDate(report.endDate)}`} />
            <DetailItem label="作成日" value={report.createdAt} />
            <DetailItem label="案件名" value={report.projectInfo.projectName} />
            <DetailItem label="顧客" value={report.customerInfo.endClient} />
          </div>
        </DetailSection>

        <DetailSection title="業務内容">
          <div className="space-y-4">
            {report.tasks.map((task, index) => (
              <div key={index} className="flex flex-col border-b last:border-b-0 pb-4">
                <p className="font-bold">{task.taskName}</p>
                <p className="text-gray-600 text-sm">進捗: {task.status}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      </div> */}
    </div>
  );
}

export default ReportDetail;