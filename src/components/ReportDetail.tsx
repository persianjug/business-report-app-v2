"use client";

import { Report } from "@/types/Report";
import { notFound } from "next/navigation";
import ConfirmationView from "@/components/ConfirmationView";
import DropdownMenu from "./DropdownMenu";
import { useReportDetailActions } from "@/hooks/useReportDetailAction";
import { FaFileExcel, FaRegFileExcel, FaRegTrashAlt } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import Button from "./Button";
import Link from "next/link";
import ConfirmationModal from "./ConfirmationModal";
import PageHeader from "./PageHeader";
import { reportFormatNewLines } from "@/utils/reportHelper";
import { useScrollLock } from "@/hooks/useScrollLock";
import NotificationBanner from "./NotificationBanner";
import LoadingSpinner from "./LoadingSpinner";

interface ReportDetailProps {
  reportId: string | number;
  report: Report;
}

const ReportDetail = ({ reportId, report }: ReportDetailProps) => {
  const {
    handleExcelExport,
    handleRemoveReport,
    modalState,
    bannerState,
    isLoading,
  } = useReportDetailActions(reportId);
  useScrollLock([modalState.isOpen, bannerState.isVisible]);

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
      onClick: () => handleRemoveReport(reportId),
      disabled: false,
      isDestructive: true,
      icon: FaRegTrashAlt,
    },
  ];

  if (!report) {
    notFound();
  }

  // return (
  //   <div className="container mx-auto p-4 max-w-4xl">
  //     {/* ローディングスピナーとモーダルは同時に表示しないようにする */}
  //     {isLoading ? (
  //       <div className="flex justify-center items-center h-screen">
  //         <LoadingSpinner />
  //       </div>
  //     ) : (
  //       <>
  //         {/* ヘッダー */}
  //         <PageHeader
  //           title={`業務報告書の詳細（ID: ${report.id}）`}
  //           actions={
  //             <>
  //               <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">
  //                 一覧に戻る
  //               </Link>
  //               <Button variant="secondary" onClick={handleExcelExport} icon={FaFileExcel}>
  //                 Excel出力
  //               </Button>
  //               <DropdownMenu items={dropDownMenuItems} />
  //             </>
  //           }
  //           isSticky
  //         />

  //         {/* 明細 */}
  //         <div className="space-y-6 text-sm">
  //           <ConfirmationView formData={reportFormatNewLines(report)} isConfirm={false} />
  //         </div>

  //         {/* モーダル */}
  //         {modalState.isOpen && (
  //           <ConfirmationModal
  //             isOpen={modalState.isOpen}
  //             variant={modalState.variant}
  //             title={modalState.title}
  //             message={modalState.message}
  //             confirmButtonText={modalState.confirmButtonText}
  //             cancelButtonText={modalState.cancelButtonText}
  //             onClose={modalState.onClose}
  //             onConfirm={modalState.onConfirm}
  //           />
  //         )}

  //         {/* ノーティフィケーションバナー */}
  //         {bannerState.isVisible && (
  //           <NotificationBanner
  //             message={bannerState.message}
  //             type={bannerState.type!}
  //             onClose={bannerState.onClose}
  //           />
  //         )}
  //       </>
  //     )}
  //   </div>
  // );



  // ローディング中はローディングスピナーだけを表示
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* ヘッダー */}
      <PageHeader
        title={`業務報告書の詳細（ID: ${report.id}）`}
        actions={
          <>
            <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">一覧に戻る</Link>
            {/* <Button variant="outline" onClick={handleExcelExport} icon={FaFileExcel}>Excel出力</Button> */}
            <Button variant="outline" onClick={handleExcelExport} icon={FaRegFileExcel}>Excel出力</Button>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        }
        isSticky
      />

      {/* 明細 */}
      <div className="space-y-6 text-sm">
        <ConfirmationView formData={reportFormatNewLines(report)} isConfirm={false} />
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

      {/* ノーティフィケーションバナー */}
      {bannerState.isVisible && (
        <NotificationBanner
          message={bannerState.message}
          type={bannerState.type!}
          onClose={bannerState.onClose}
        />
      )}
    </div>
  );
}

export default ReportDetail;