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
  } = useReportForm(REPORT_INITIAL_DATA);

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
      <PageHeader
        title={`${step === "confirm" ? "登録内容の確認" : "業務報告書の登録内容入力"}`}
        description={step === "input" ? "業務報告書を新規作成します。必要事項を入力し、「確認画面へ進む」ボタンを押してください。" : undefined}
        actions={step === "input" ? (
          <>
            <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2" onClick={handleBackToList}>一覧に戻る</Link>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        ) : (
          <>
            <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>入力に戻る</Link>
          </>
        )}
        isSticky
      />

      <div className="space-y-6 text-sm">
        {step === "input" ? (
          <>
            <InputForm
              handleSubmit={handleSubmit(onSubmitToConfirm)}
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              handleAddTask={handleAddTask}
              handleRemoveTask={handleRemoveTask}
              handleLoadLatest={handleLoadLatest}
              hasReports={hasReports}
            />
          </>
        ) : (
          <div className="space-y-6 text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={false} />
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                variant="success"
                onClick={handleApiPostSubmit}>この内容で登録する</Button>
            </div>
          </div>
        )}
      </div>

      {/* モーダルコンポーネント */}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          // onConfirm={modalState.type === "backToList" ? performBackToList : performLoadLatest}
          onConfirm={modalState.type === "removeTask" ? performRemoveTask : (
            modalState.type === "backToList" ? performBackToList : performLoadLatest
          )}
          title={modalState.title}
          message={modalState.message}
          variant={"confirm"}
          // confirmButtonText={modalState.type === "confirm" ? "最新報告書を読み込む" : "破棄して一覧へ戻る"}
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