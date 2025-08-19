"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reportSchema, FormData } from "@/schemas/reportSchema";
import api from "@/utils/axios";
import { setDraftReport, setReport, updateReport } from "@/lib/report";
import { ModalBannerState, modalState } from "@/types/modal";
import { INITIAL_MODAL_BANNER_STATE, INITIAL_MODAL_STATE, LOAD_LATEST_DIRTY_MODAL_STATE, LOAD_LATEST_ERROR_MODAL_STATE, LOAD_LATEST_SUCCESS_MODAL_STATE } from "@/Constants/modalConstants";

export const useReportForm = (initialData: FormData | null = null) => {
  const router = useRouter();
  const [hasReports, setHasReports] = useState(false);
  const [step, setStep] = useState<"input" | "confirm">("input");

  // モーダルとバナー表示状態とタイプを管理
  const [uiState, setUiState] = useState<ModalBannerState>(INITIAL_MODAL_BANNER_STATE);

  // タスク削除用モーダルの状態
  const [taskToRemoveIndex, setTaskToRemoveIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(reportSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const formData = watch();

  useEffect(() => {
    if (step === "confirm" || step === "input") {
      // 画面の先頭（x座標: 0, y座標: 0）にスムーズにスクロール
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [step]); // stepの状態が変わるたびにこのエフェクトが実行される

  useEffect(() => {
    const checkReports = async () => {
      try {
        const response = await api.get<boolean>("/reports/has-data");
        setHasReports(response.data);
      } catch (error) {
        console.error("報告書の存在確認に失敗しました:", error);
      }
    };
    checkReports();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleAddTask = () => {
    if (fields.length < 5) {
      append({ taskName: "", status: "", problem: "" });
    }
  };

  // const handleRemoveTask = (index: number) => {
  //   if (window.confirm("本当にこのタスクを削除しますか？")) {
  //     remove(index);
  //   }
  // };

  // 既存のhandleRemoveTaskをモーダル表示に置き換える
  const handleRemoveTask = (index: number) => {
    setTaskToRemoveIndex(index);
    setUiState({
      modal: {
        isOpen: true,
        type: "removeTask",
        title: "タスクの削除",
        message: "本当にこのタスクを削除しますか？",
      },
      banner: { isVisible: false, message: "", type: null },
    });
    // モーダル表示時にスクロールを無効化
    document.body.style.overflow = "hidden";
  };

  // モーダルで削除が確定されたときに実行する関数
  const performRemoveTask = () => {
    if (taskToRemoveIndex !== null) {
      remove(taskToRemoveIndex);
      setTaskToRemoveIndex(null); // 削除後インデックスをリセット
      closeModal(); // モーダルを閉じる
    }
  };

  const onSubmitToConfirm = async (data: FormData) => {
    setStep("confirm");
  };

  const handleApiPostSubmit = async () => {
    try {
      await setReport(formData);
      // alert("報告書が正常に作成されました");
      // バナーで成功メッセージを表示(prevは最新状態のスナップショット)
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "報告書を登録しました。", type: "success" },
      }));

      // 2秒後に一覧ページへ遷移
      setTimeout(() => {
        router.push("/reports");
      }, 2000); // 2000ms = 2秒

    } catch (error) {
      // alert("報告書の作成に失敗しました");
      // バナーで失敗メッセージを表示(prevは最新状態のスナップショット)
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "報告書の登録に失敗しました。", type: "error" },
      }));
      // router.push("/reports");
    }
  };

  const handleApiPutSubmit = async (reportId: string | number) => {
    try {
      await updateReport(reportId, formData);
      // alert("報告書が正常に更新されました");
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "報告書を更新しました。", type: "success" },
      }));

      // 2秒後に一覧ページへ遷移
      setTimeout(() => {
        router.push("/reports");
      }, 2000); // 2000ms = 2秒

    } catch (error) {
      // alert("報告書の更新に失敗しました");
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "報告書の更新に失敗しました。", type: "error" },
      }));
    }
  };

  // 最新の報告書ロード処理
  const performLoadLatest = async () => {
    try {
      const response = await api.get<any>("/reports/latest");
      const latestReport = response.data;
      reset({
        ...latestReport,
        startDate: "",
        endDate: "",
        overallProgress: "",
        tasks: latestReport.tasks?.length > 0
          ? latestReport.tasks.map((task: any) => ({ ...task, status: "", problem: "" }))
          : [{ taskName: "", status: "", problem: "" }],
      });

      // バナーで成功メッセージを表示(prevは最新状態のスナップショット)
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "最新の報告書データを読み込みました。", type: "success" },
      }));
    } catch (error) {
      console.error("最新の報告書データの取得に失敗しました:", error);
      // バナーで失敗メッセージを表示(prevは最新状態のスナップショット)
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "最新の報告書データが見つかりませんでした。", type: "error" },
      }));
    }
  };

  // 下書き保存処理のハンドラー
  const handleSaveAsDraft = async () => {
    try {
      await setDraftReport(formData);
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "下書きを保存しました。", type: "success" },
      }));
      // 下書き保存後、編集画面に留まる
      // IDがなければ、新規作成として扱うためにリセット
      // if (!formData.id) {
      //   reset({ ...formData, id: 'new-id-or-something' }); // 実際に保存されたIDを受け取るロジックが必要
      // }
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        modal: { isOpen: false, type: null, message: "", title: "" },
        banner: { isVisible: true, message: "下書きの保存に失敗しました。", type: "error" },
      }));
    }
  };



  // 一覧へ戻る操作処理
  const performBackToList = () => {
    router.push("/reports");
  };

  // 詳細へ戻る操作処理
  const performBackToDetail = (reportId: string | number) => {
    router.push(`/reports/${reportId}`);
  };


  // モーダルを閉じる関数
  const closeModal = () => {
    setUiState(prev => ({
      ...prev,
      modal: { ...prev.modal, isOpen: false }
    }))
    // ここでスクロールを元に戻す(スクロールができるようにする)
    document.body.style.overflow = "";
  };

  // バナーを閉じる関数
  const closeBanner = () => {
    setUiState(prev => ({
      ...prev,
      banner: { isVisible: false, message: "", type: null },
    }));
    // ここでスクロールを元に戻す(スクロールができるようにする)
    document.body.style.overflow = "";
  };

  // ドロップダウンメニューの「最新の報告書を読み込む」ボタンのハンドラー
  const handleLoadLatest = () => {
    if (isDirty) {
      // フォームに変更がある場合は確認モーダルを表示
      setUiState({
        modal: {
          isOpen: true,
          type: "confirm",
          title: "最新報告書の読み込み",
          message: "現在入力中の内容は保存されません。最新の報告書を読み込みますか？",
        },
        banner: { isVisible: false, message: "", type: null },
      });
    } else {
      // 変更がない場合は直接読み込みを実行
      performLoadLatest();
    }
  };

  // 「一覧へ戻る」ボタンのハンドラー
  const handleBackToList = (e: React.MouseEvent) => {
    if (isDirty) {
      // isDirtyがtrueの場合、デフォルトのイベントをキャンセルしてモーダルを表示
      e.preventDefault();
      setUiState({
        modal: {
          isOpen: true,
          type: "backToList",
          title: "入力内容の破棄",
          message: "入力中の内容が破棄されますがよろしいですか？",
        },
        banner: { isVisible: false, message: "", type: null },
      });
    } else {
      // フォームの変更なしの場合Linkのデフォルト動作で遷移。
    }
  };
  // 「一覧へ戻る」ボタンのハンドラー
  const handleBackToListFromEdit = (e: React.MouseEvent) => {
    if (isDirty) {
      // isDirtyがtrueの場合、デフォルトのイベントをキャンセルしてモーダルを表示
      e.preventDefault();
      setUiState({
        modal: {
          isOpen: true,
          type: "backToList",
          title: "入力内容の破棄",
          message: "入力中の内容が破棄されますがよろしいですか？",
        },
        banner: { isVisible: false, message: "", type: null },
      });
    } else {
      // フォームの変更なしの場合
      performBackToList();
    }
  };

  // 「詳細へ戻る」ボタンのハンドラー
  const handleBackToDetail = (e: React.MouseEvent) => {
    if (isDirty) {
      // isDirtyがtrueの場合、デフォルトのイベントをキャンセルしてモーダルを表示
      e.preventDefault();
      setUiState({
        modal: {
          isOpen: true,
          type: "backToDetail",
          title: "入力内容の破棄",
          message: "入力中の内容が破棄されますがよろしいですか？",
        },
        banner: { isVisible: false, message: "", type: null },
      });
    } else {
      // isDirtyがfalseの場合は何もしない（Linkのデフォルト動作で遷移）
    }
  };

  return {
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
    handleApiPutSubmit,
    handleLoadLatest,
    handleBackToList,
    handleBackToListFromEdit,
    handleBackToDetail,
    modalState: uiState.modal,
    bannerState: uiState.banner,
    closeModal,
    closeBanner,
    performLoadLatest,
    performBackToList,
    performBackToDetail,
    performRemoveTask,
    handleSaveAsDraft,
  };
};