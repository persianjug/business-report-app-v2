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
import NotificationBanner from "./NotificationBanner";
import ScrollButtons from "./ScrollButtons";
import { FaRegTrashAlt } from "react-icons/fa";
import { useReportDetailActions } from "@/hooks/useReportDetailAction";
import { useScrollLock } from "@/hooks/useScrollLock";

interface DraftEditFormProps {
  reportId: string | number;
  initialData: Report;
}

const DraftEditForm = ({ reportId, initialData }: DraftEditFormProps) => {
  const {
    step,
    setStep,
    hasReports,
    register,
    handleSubmit,
    control,
    errors,
    fields,
    formData,
    handleAddTask,
    handleRemoveTask,
    onSubmitToConfirm,
    handleApiPutSubmit,
    handleLoadLatest,
    modalState,
    bannerState,
    closeModal,
    closeBanner,
    performRemoveTask,
    handleSaveAsDraft,
    handleRemoveReport,
    performRemoveReport,
  } = useReportForm(initialData);

  useScrollLock([modalState.isOpen, bannerState.isVisible]);

  const formId = "edit-report-form";

  if (!initialData) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* ヘッダー */}
      {step === "input" && (
        <PageHeader
          title={`下書きの修正（ID: ${reportId}）`}
          description={
            <>
              <p className="text-gray-700">
                下書きを編集します。必要事項を修正し、「確認画面へ進む」ボタンを押してください
              </p>
            </>
          }
          actions={
            <>
              <Link href={`/reports`} className="text-blue-600 hover:underline px-4 py-2">一覧に戻る</Link>
              <Button variant="outline" onClick={() => handleRemoveReport(reportId)} icon={FaRegTrashAlt}>下書きを削除</Button>
            </>
          }
          isSticky
        />
      )}
      {step === "confirm" && (
        <PageHeader
          title={"修正内容の確認"}
          description={
            <div className="text-blue-700">
              <p className="font-bold">内容をご確認ください。</p>
              <p>以下の内容でよろしければ、「この内容で更新する」ボタンを押してください。</p>
            </div>
          }
          actions={
            <>
              <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>編集に戻る</Link>
            </>
          }
          isSticky
        />
      )}

      {step === "input" && (
        <>
          <form onSubmit={handleSubmit(onSubmitToConfirm)} id={formId} className="space-y-6 text-sm">
            <InputForm
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              handleAddTask={handleAddTask}
              handleRemoveTask={handleRemoveTask}
              handleLoadLatest={handleLoadLatest}
              handleSaveAsDraft={handleSaveAsDraft}
              hasReports={hasReports}
              isEditMode={true}
            />
          </form>
          <div className="flex justify-end mt-6 gap-x-4">
            <Button type="button" variant="secondary" onClick={handleSaveAsDraft} form={formId}>下書き保存</Button>
            <Button type="submit" variant="primary" form={formId}>確認画面へ進む</Button>
          </div>
        </>
      )}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={true} />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="success"
              onClick={() => handleApiPutSubmit(reportId)}>この内容で更新する</Button>
          </div>
        </div>
      )}

      {/* ページ上部、下部へスクロールボタン */}
      <ScrollButtons />

      {/* モーダルコンポーネント */}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onConfirm={modalState.type === "removeTask" ? performRemoveTask : () => performRemoveReport(reportId)}
          title={modalState.title}
          message={modalState.message}
          variant={"confirm"}
          confirmButtonText={modalState.type === "removeTask" ? "タスクを削除する" : "下書きデータを削除する"}
          cancelButtonText="キャンセル"
        />
      )}

      {/* ノーティフィケーションバナーコンポーネント */}
      {bannerState.isVisible && (
        <NotificationBanner
          message={bannerState.message}
          type={bannerState.type!}
          onClose={closeBanner}
        />
      )}
    </div>
  );
}

export default DraftEditForm;