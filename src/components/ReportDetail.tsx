"use client";

import { Report } from "@/types/Report";
import { notFound } from "next/navigation";
import ConfirmationView from "@/components/ConfirmationView";
import DropdownMenu from "./DropdownMenu";
import { useReportDetailActions } from "@/hooks/useReportDetailAction";
import { FaFileExcel, FaRegTrashAlt } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import Button from "./Button";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";

interface ReportDetailProps {
  reportId: string | number;
  report: Report;
}

const ReportDetail = ({ reportId, report }: ReportDetailProps) => {
  const { handleDelete, handleExcelExport, isModalOpen, setIsModalOpen } = useReportDetailActions(reportId);

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
      onClick: () => setIsModalOpen(true),
      disabled: false,
      isDestructive: true,
      icon: FaRegTrashAlt,
    },
  ];

  if (!report) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">業務報告書詳細（ID: {report.id}）</h1>
        <div className="flex space-x-2">
          <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">
            一覧に戻る
          </Link>
          <Button variant="secondary" onClick={handleExcelExport} icon={FaFileExcel}>
            Excel出力
          </Button>
          <DropdownMenu items={dropDownMenuItems} />
        </div>
      </div>

      {/* <div className="space-y-6"> */}
      <ConfirmationView formData={report} isConfirm={false} />

      {/* モーダル */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="報告書の削除"
        message="本当にこの報告書を削除しますか？この操作は元に戻せません。"
      />
    </div>
  );
}

export default ReportDetail;