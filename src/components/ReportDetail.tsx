"use client";

import { Report } from "@/types/Report";
import { notFound } from "next/navigation";
import ConfirmationView from "@/components/ConfirmationView";
import DropdownMenu from "./DropdownMenu";
import { useReportDetail } from "@/hooks/useReportDetail";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import Button from "./Button";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";
import PageHeader from "./PageHeader";
import { transformReportToFormData } from "@/utils/reportHelper";
import { FiDownload } from "react-icons/fi";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ReportDetailProps {
  reportId: string | number;
  report: Report;
}

const ReportDetail = ({ reportId, report }: ReportDetailProps) => {
  const {
    handleExcelExport,
    handleRemoveReport,
    modalState,
  } = useReportDetail(reportId);

  // モーダル表示時のスクロール禁止制御
  useScrollLock([modalState.isOpen]);

  // ドロップダウンリストのメニュー
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
      onClick: () => handleRemoveReport(reportId, "published"),
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
      {/* ヘッダー */}
      <PageHeader
        title={`業務報告書の詳細（ID: ${report.id}）`}
        actions={
          <>
            <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">一覧に戻る</Link>
            <Button variant="outline" onClick={handleExcelExport} icon={FiDownload}>Excel出力</Button>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        }
        isSticky
      />

      {/* 明細 */}
      <div className="space-y-6 text-sm">
        <ConfirmationView formData={transformReportToFormData(report)} isConfirm={false} />
      </div>

      {/* モーダル */}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          variant={modalState.variant}
          title={modalState.title}
          message={modalState.message}
          confirmButtonText={modalState.confirmButtonText}
          cancelButtonText={modalState.cancelButtonText}
          onClose={modalState.onClose}
          onConfirm={modalState.onConfirm}
        />
      )}
    </div>
  );
}

export default ReportDetail;
