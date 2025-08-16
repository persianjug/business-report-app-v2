// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { reportSchema, FormData } from "@/schemas/reportSchema";
// import api from "@/utils/axios";
// import { setReport, updateReport } from "@/lib/report";
// import { modalState } from "@/types/modal";
// import { INITIAL_MODAL_STATE, LOAD_LATEST_DIRTY_MODAL_STATE, LOAD_LATEST_ERROR_MODAL_STATE, LOAD_LATEST_SUCCESS_MODAL_STATE } from "@/Constants/modalConstants";

// export const useReportForm = (initialData: FormData | null = null) => {
//   const router = useRouter();
//   const [hasReports, setHasReports] = useState(false);
//   const [step, setStep] = useState<"input" | "confirm">("input");

//   // モーダル表示状態とタイプを管理
//   const [modalState, setModalState] = useState<modalState>(INITIAL_MODAL_STATE);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     watch,
//     formState: { errors, isDirty },
//   } = useForm<FormData>({
//     resolver: yupResolver(reportSchema),
//     defaultValues: initialData,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "tasks",
//   });

//   const formData = watch();

//   useEffect(() => {
//     if (step === "confirm" || step === "input") {
//       // 画面の先頭（x座標: 0, y座標: 0）にスムーズにスクロール
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: "smooth",
//       });
//     }
//   }, [step]); // stepの状態が変わるたびにこのエフェクトが実行される

//   useEffect(() => {
//     const checkReports = async () => {
//       try {
//         const response = await api.get<boolean>("/reports/has-data");
//         setHasReports(response.data);
//       } catch (error) {
//         console.error("報告書の存在確認に失敗しました:", error);
//       }
//     };
//     checkReports();
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (isDirty) {
//         event.preventDefault();
//         event.returnValue = "";
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isDirty]);

//   const handleAddTask = () => {
//     if (fields.length < 5) {
//       append({ taskName: "", status: "", problem: "" });
//     }
//   };

//   const handleRemoveTask = (index: number) => {
//     if (window.confirm("本当にこのタスクを削除しますか？")) {
//       remove(index);
//     }
//   };

//   const onSubmitToConfirm = async (data: FormData) => {
//     setStep("confirm");
//   };

//   const handleApiPostSubmit = async () => {
//     try {
//       await setReport(formData);
//       alert("報告書が正常に作成されました");
//       router.push("/reports");
//     } catch (error) {
//       alert("報告書の作成に失敗しました");
//     }
//   };

//   const handleApiPutSubmit = async () => {
//     try {
//       await updateReport(formData);
//       alert("報告書が正常に更新されました");
//       router.push("/reports");
//     } catch (error) {
//       alert("報告書の更新に失敗しました");
//     }
//   };


//   // ロード処理を分離
//   const performLoadLatest = async () => {
//     try {
//       const response = await api.get<any>("/reports/latest");
//       const latestReport = response.data;
//       reset({
//         ...latestReport,
//         startDate: "",
//         endDate: "",
//         overallProgress: "",
//         tasks: latestReport.tasks?.length > 0
//           ? latestReport.tasks.map((task: any) => ({ ...task, status: "", problem: "" }))
//           : [{ taskName: "", status: "", problem: "" }],
//       });
//       // 成功モーダルを表示
//       setModalState(LOAD_LATEST_SUCCESS_MODAL_STATE);
//     } catch (error) {
//       console.error("最新の報告書データの取得に失敗しました:", error);
//       // 失敗モーダルを表示
//       setModalState(LOAD_LATEST_ERROR_MODAL_STATE);
//     }
//   };

//   // ドロップダウンメニューの「最新の報告書を読み込む」ボタンのハンドラー
//   const handleLoadLatest = () => {
//     if (isDirty) {
//       // フォームに変更がある場合は確認モーダルを表示
//       setModalState(LOAD_LATEST_DIRTY_MODAL_STATE);
//     } else {
//       // 変更がない場合は直接読み込みを実行
//       performLoadLatest();
//     }
//   };

//   // モーダルを閉じる関数
//   const closeModal = () => {
//     setModalState({ ...modalState, isOpen: false });
//   };


//   // const handleLoadLatest = async () => {
//   //   if (isDirty) {
//   //     const shouldLoad = window.confirm("現在入力中の内容は保存されません。最新の報告書を読み込みますか？");
//   //     if (!shouldLoad) return;
//   //   }
//   //   try {
//   //     const response = await api.get<any>("/reports/latest");
//   //     const latestReport = response.data;
//   //     reset({
//   //       ...latestReport,
//   //       startDate: "",
//   //       endDate: "",
//   //       overallProgress: "",
//   //       tasks: latestReport.tasks?.length > 0
//   //         ? latestReport.tasks.map((task: any) => ({ ...task, status: "", problem: "" }))
//   //         : [{ taskName: "", status: "", problem: "" }],
//   //     });
//   //     alert("最新の報告書データを読み込みました");
//   //   } catch (error) {
//   //     console.error("最新の報告書データの取得に失敗しました:", error);
//   //     alert("最新の報告書データが見つかりませんでした");
//   //   }
//   // };

//   const handleBackToList = () => {
//     if (isDirty) {
//       const shouldDiscard = window.confirm("入力中の内容が破棄されますがよろしいですか？");
//       if (shouldDiscard) router.push("/reports");
//     } else {
//       router.push("/reports");
//     }
//   };

//   return {
//     step,
//     setStep,
//     hasReports,
//     register,
//     handleSubmit,
//     control,
//     errors,
//     fields,
//     formData,
//     handleAddTask,
//     handleRemoveTask,
//     onSubmitToConfirm,
//     handleApiPostSubmit,
//     handleApiPutSubmit,
//     handleLoadLatest,
//     handleBackToList,
//     modalState,
//     closeModal,
//     performLoadLatest,
//   };
// };