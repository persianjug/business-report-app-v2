"use client";

import { REPORT_INITIAL_DATA } from "@/Constants/reportConstants";
import Button from "./Button";
import ConfirmationView from "./ConfirmationView";
import InputForm from "./InputForm";
import { useReportForm } from "@/hooks/useReportForm";
import DropdownMenu from "./DropdownMenu";
import { BiLoaderAlt } from "react-icons/bi";
import Link from "next/link";
import PageHeader from "./PageHeader";
import ConfirmationModal from "./ConfirmationModal";
import NotificationBanner from "./NotificationBanner";
import ScrollButtons from "./ScrollButtons";

export default function CreateForm() {
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
    handleApiPostSubmit,
    handleLoadLatest,
    handleBackToList,
    modalState,
    bannerState,
    closeModal,
    closeBanner,
    performLoadLatest,
    performBackToList,
    performRemoveTask,
    handleSaveAsDraft,
  } = useReportForm(REPORT_INITIAL_DATA);

  const formId = "create-report-form";

  // ドロップダウンリストのメニュー
  const dropDownMenuItems = [
    {
      label: "最新の報告書を読み込む",
      onClick: handleLoadLatest,
      // disabled: hasReports,
      disabled: false,
      isDestructive: false,
      icon: BiLoaderAlt,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* ヘッダー */}
      {step === "input" && (
        <PageHeader
          title={"業務報告書の登録内容入力"}
          description={
            <>
              <p className="text-gray-700">
                業務報告書を新規作成します。必要事項を入力し、「確認画面へ進む」ボタンを押してください。
              </p>
            </>
          }
          actions={
            <>
              <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2" onClick={handleBackToList}>一覧に戻る</Link>
              <DropdownMenu items={dropDownMenuItems} />
            </>
          }
          isSticky
        />
      )}
      {step === "confirm" && (
        <PageHeader
          title={"登録内容の確認"}
          description={
            <div className="text-blue-700">
              <p className="font-bold">内容をご確認ください。</p>
              <p>以下の内容でよろしければ、「この内容で登録する」ボタンを押してください。</p>
            </div>
          }
          actions={
            <>
              <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>入力に戻る</Link>
            </>
          }
          isSticky
        />
      )}

      {/* フォーム */}
      {step === "input" && (
        <div className="space-y-6">
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
            />
          </form>
          <div className="flex justify-end mt-6 gap-x-4">
            <Button type="button" variant="outline" onClick={handleSaveAsDraft} form={formId}>下書き保存</Button>
            <Button type="submit" variant="primary" form={formId}>確認画面へ進む</Button>
          </div>
        </div>
      )}

      {/* 確認 */}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={false} />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="success"
              onClick={handleApiPostSubmit}>この内容で登録する</Button>
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
          onConfirm={modalState.type === "removeTask" ? performRemoveTask : (
            modalState.type === "backToList" ? performBackToList : performLoadLatest
          )}
          title={modalState.title}
          message={modalState.message}
          variant={"confirm"}
          confirmButtonText={modalState.type === "removeTask" ? "タスクを削除する" : (
            modalState.type === "confirm" ? "最新報告書を読み込む" : "破棄して一覧へ戻る"
          )}
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