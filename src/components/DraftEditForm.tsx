"use client";

import { useReportForm } from "@/hooks/useReportForm";
import Button from "./Button";
import ConfirmationView from "./ConfirmationView";
import InputForm from "./InputForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { Report } from "@/types/Report";
import ConfirmationModal from "./ConfirmationModal";
import ScrollButtons from "./ScrollButtons";
import { FaRegTrashAlt } from "react-icons/fa";
import { useScrollLock } from "@/hooks/useScrollLock";
import ErrorAlert from "./ErrorAlert";
import PageDescription from "./PageDescription";
import { useReportDeletion } from "@/hooks/useReportDeletion";
import { transformReportToFormData } from "@/utils/reportHelper";

interface DraftEditFormProps {
  reportId: string | number;
  initialData: Report;
}

const DraftEditForm = ({ reportId, initialData }: DraftEditFormProps) => {
  const {
    step,
    setStep,
    register,
    handleSubmit,
    errors,
    fields,
    formData,
    handleAddTask,
    handleRemoveTask,
    handleRemoveReport,
    handleApiPut,
    handleBackToList,
    modalState,
    showErrorAlert,
    isDirty,
  } = useReportForm(transformReportToFormData(initialData));

  // モーダル表示時のスクロール禁止制御
  useScrollLock([modalState.isOpen]);

  // フォームID
  // InputFormコンポーネントでフォーム外で送信処理を行うため指定が必要
  const formId = "edit-report-form";

  if (!initialData) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* ヘッダー：下書き編集画面 */}
      {step === "input" && (
        <PageHeader
          title={`下書きの修正（ID: ${reportId}）`}
          description={
            <>
              {showErrorAlert ?
                <ErrorAlert
                  message="入力内容に不備があります。"
                  subMessage="すべての項目が正しく入力されているか確認してください。"
                />
                :
                <PageDescription>
                  下書きを編集します。必要事項を入力し、「確認画面へ進む」ボタンを押してください。
                </PageDescription>
              }
            </>
          }
          actions={
            <>
              <Link
                href={`/reports`}
                className="text-blue-600 hover:underline px-4 py-2"
                onClick={handleBackToList}>一覧に戻る</Link>
              <Button variant="outline" onClick={() => handleRemoveReport(reportId, "draft")} icon={FaRegTrashAlt}>下書きを削除</Button>
            </>
          }
          isSticky
        />
      )}

      {/* ヘッダー：確認画面 */}
      {step === "confirm" && (
        <PageHeader
          title={"登録内容の確認"}
          description={
            <PageDescription>
              <p className="font-bold">内容をご確認ください。</p>
              <p>以下の内容でよろしければ、「この内容で登録する」ボタンを押してください。</p>
            </PageDescription>
          }
          actions={
            <>
              <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>編集に戻る</Link>
            </>
          }
          isSticky
        />
      )}

      {/* メインコンテンツ：下書き編集画面 */}
      {step === "input" && (
        <>
          <form onSubmit={handleSubmit} id={formId} className="space-y-6 text-sm">
            <InputForm
              register={register}
              errors={errors}
              fields={fields}
              handleAddTask={handleAddTask}
              handleRemoveTask={handleRemoveTask}
            />
          </form>
          <div className="flex justify-end mt-6 gap-x-4">
            <Button type="button" variant="outline" onClick={() => handleApiPut(reportId)} form={formId}>下書き保存</Button>
            <Button type="submit" variant="primary" form={formId}>確認画面へ進む</Button>
          </div>
        </>
      )}

      {/* メインコンテンツ：確認画面 */}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={true} />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="success"
              onClick={() => handleApiPut(reportId)}>この内容で登録する</Button>
          </div>
        </div>
      )}

      {/* ページ上部、下部へスクロールボタン */}
      <ScrollButtons />

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

export default DraftEditForm;
