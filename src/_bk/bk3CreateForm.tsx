// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/utils/axios";
// import ConfirmationView from "./ConfirmationView";
// import * as yup from "yup";
// import { useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import ErrorMessage from "./ErrorMessage";
// import Label from "./Label";

// // 選択肢を定数として定義
// const positions = ["PG", "SE", "SE(社員代替)", "テスター", "オペレーター", "PL", "PM", "社員代替"];
// const workStyles = ["併用勤務(在宅率6割以上)", "併用勤務(在宅率6割未満)", "現場勤務", "在宅勤務"];

// // yupによるバリデーションスキーマ
// const reportSchema = yup.object().shape({
//   startDate: yup.string().required("報告対象期間の開始日は必須です。"),
//   endDate: yup.string()
//     .required("報告対象期間の終了日は必須です。")
//     .test(
//       "is-after-start-date",
//       "終了日は開始日以降の日付を選択してください。",
//       function (value) {
//         const { startDate } = this.parent;
//         if (!startDate || !value) {
//           return true;
//         }
//         const start = new Date(startDate);
//         const end = new Date(value);
//         return end >= start;
//       }
//     ),
//   customerInfo: yup.object().shape({
//     endClient: yup.string().required("エンド企業名は必須です。"),
//     upperClient: yup.string().required("上位企業名は必須です。"),
//     industry: yup.string().required("業種は必須です。"),
//     nearestStation: yup.string().required("職場最寄駅は必須です。"),
//   }),
//   projectInfo: yup.object().shape({
//     projectName: yup.string().required("案件名は必須です。"),
//     participationDate: yup.string().required("参画日は必須です。"),
//     numberOfParticipants: yup.number().min(1, "参画人数は1以上である必要があります。"),
//     commuteHours: yup.number().min(0, "時間は0以上である必要があります。"),
//     commuteMinutes: yup.number().min(0, "分は0以上である必要があります。").max(59, "分は59以下である必要があります。").nullable(),
//     workStyle: yup.string().required("勤務形態は必須です。"),
//     position: yup.string().required("ポジションは必須です。"),
//     mainTechnology: yup.string().required("主要技術は必須です。"),
//     database: yup.string().required("データベースは必須です。"),
//   }),
//   overallProgress: yup.string().required("全体状況は必須です。"),
//   tasks: yup.array().of(
//     yup.object().shape({
//       taskName: yup.string().required("タスク名は必須です。"),
//       status: yup.string().required("状況は必須です。"),
//       problem: yup.string().nullable(),
//     })
//   ).min(1, "タスクは最低1つは必要です。"),
//   futurePlans: yup.string().required("今後の予定は必須です。"),
//   otherInfo: yup.object().shape({
//     customerStatus: yup.string().nullable(),
//     salesInfo: yup.string().nullable(),
//     healthStatus: yup.string().nullable(),
//     vacationPlans: yup.string().nullable(),
//   }),
//   consultation: yup.string().nullable(),
// });

// type FormData = yup.InferType<typeof reportSchema>;

// export default function CreateForm() {
//   const router = useRouter();
//   const [hasReports, setHasReports] = useState(false);
//   const [step, setStep] = useState<"input" | "confirm">("input");

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     watch,
//     formState: { errors, isDirty },
//   } = useForm<FormData>({
//     resolver: yupResolver(reportSchema),
//     defaultValues: {
//       startDate: "",
//       endDate: "",
//       customerInfo: {
//         endClient: "",
//         upperClient: "",
//         industry: "",
//         nearestStation: "",
//       },
//       projectInfo: {
//         projectName: "",
//         participationDate: "",
//         numberOfParticipants: 0,
//         commuteHours: 0,
//         commuteMinutes: 0,
//         workStyle: "",
//         position: "",
//         mainTechnology: "",
//         database: "",
//       },
//       overallProgress: "",
//       tasks: [{ taskName: "", status: "", problem: "" }],
//       futurePlans: "",
//       otherInfo: {
//         customerStatus: "",
//         salesInfo: "",
//         healthStatus: "",
//         vacationPlans: "",
//       },
//       consultation: "",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "tasks",
//   });

//   const formData = watch();

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

//   const handleApiSubmit = async () => {
//     try {
//       await api.post("/reports", formData);
//       alert("報告書が正常に作成されました");
//       router.push("/reports");
//     } catch (error) {
//       console.error("報告書の作成に失敗しました:", error);
//       alert("報告書の作成に失敗しました");
//     }
//   };

//   const handleLoadLatest = async () => {
//     if (isDirty) {
//       const shouldLoad = window.confirm(
//         "現在入力中の内容は保存されません。最新の報告書を読み込みますか？"
//       );
//       if (!shouldLoad) {
//         return;
//       }
//     }

//     try {
//       const response = await api.get<Report>("/reports/latest");
//       const latestReport = response.data;
//       reset({
//         ...latestReport,
//         startDate: "",
//         endDate: "",
//         overallProgress: "",
//         tasks: latestReport.tasks && latestReport.tasks.length > 0
//           ? latestReport.tasks.map(task => ({ ...task, status: "", problem: "" }))
//           : [{ taskName: "", status: "", problem: "" }],
//       });
//       alert("最新の報告書データを読み込みました");
//     } catch (error) {
//       console.error("最新の報告書データの取得に失敗しました:", error);
//       alert("最新の報告書データが見つかりませんでした");
//     }
//   };

//   const handleBackToList = () => {
//     if (isDirty) {
//       const shouldDiscard = window.confirm(
//         "入力中の内容が破棄されますがよろしいですか？"
//       );
//       if (shouldDiscard) {
//         router.push("/reports");
//       }
//     } else {
//       router.push("/reports");
//     }
//   };

//   const renderLabel = (label: string, isRequired: boolean) => (
//     <label className="block text-sm font-semibold text-gray-700">
//       {label}
//       {/* {isRequired && <span className="text-red-500 ml-1">*</span>} */}
//       {isRequired && <span className="required-label">必須</span>}
//     </label>
//   );

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">業務報告書{step === "confirm" ? "確認" : "作成"}</h1>
//         {step === "input" && (
//           <div className="flex space-x-2">
//             <button
//               type="button"
//               onClick={handleLoadLatest}
//               disabled={!hasReports}
//               className={`
//                 font-bold py-2 px-4 rounded-md shadow-md
//                 ${hasReports
//                   ? "bg-purple-600 hover:bg-purple-700 text-white"
//                   : "bg-gray-400 text-gray-700 cursor-not-allowed"}
//               `}
//             >
//               最新の報告書を読み込む
//             </button>
//           </div>
//         )}
//       </div>

//       {step === "input" ? (
//         <form onSubmit={handleSubmit(onSubmitToConfirm)} className="space-y-6">
//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">基本情報</h2>
//             <div>
//               <Label text="報告対象期間" isRequired={true} />
//               <div className="mt-1 flex space-x-4">
//                 <input
//                   type="date"
//                   {...register("startDate")}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <span className="self-center">〜</span>
//                 <input
//                   type="date"
//                   {...register("endDate")}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <ErrorMessage message={errors.startDate?.message} />
//               <ErrorMessage message={errors.endDate?.message} />
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">顧客情報</h2>
//             <div>
//               <Label text="エンド企業" isRequired={true} />
//               <input
//                 type="text"
//                 id="endClient"
//                 {...register("customerInfo.endClient")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.customerInfo?.endClient?.message} />
//             </div>
//             <div>
//               {renderLabel("上位企業", true)}
//               <input
//                 type="text"
//                 id="upperClient"
//                 {...register("customerInfo.upperClient")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.customerInfo?.upperClient?.message} />
//             </div>
//             <div>
//               <Label text="業種" isRequired={true} />
//               <input
//                 type="text"
//                 id="industry"
//                 {...register("customerInfo.industry")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.customerInfo?.industry?.message} />
//             </div>
//             <div>
//               <Label text="職場最寄駅" isRequired={true} />
//               <input
//                 type="text"
//                 id="nearestStation"
//                 {...register("customerInfo.nearestStation")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.customerInfo?.nearestStation?.message} />
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">案件情報</h2>
//             <div>
//               <Label text="案件名" isRequired={true} />
//               <input
//                 type="text"
//                 id="projectName"
//                 {...register("projectInfo.projectName")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.projectInfo?.projectName?.message} />
//             </div>
//             <div>
//               <Label text="参画日" isRequired={true} />
//               <input
//                 type="date"
//                 id="participationDate"
//                 {...register("projectInfo.participationDate")}
//                 className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.projectInfo?.participationDate?.message} />
//             </div>
//             <div>
//               <Label text="参画人数" isRequired={true} />
//               <input
//                 type="number"
//                 id="numberOfParticipants"
//                 {...register("projectInfo.numberOfParticipants", { valueAsNumber: true })}
//                 className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.projectInfo?.numberOfParticipants?.message} />
//             </div>
//             <div>
//               <Label text="通勤時間" isRequired={true} />
//               <div className="mt-1 flex space-x-2 items-center">
//                 <input
//                   type="number"
//                   {...register("projectInfo.commuteHours", { valueAsNumber: true })}
//                   className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <span className="text-gray-500">時間</span>
//                 <input
//                   type="number"
//                   {...register("projectInfo.commuteMinutes", { valueAsNumber: true })}
//                   className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <span className="text-gray-500">分</span>
//               </div>
//               <ErrorMessage message={errors.projectInfo?.commuteHours?.message} />
//               <ErrorMessage message={errors.projectInfo?.commuteMinutes?.message} />
//             </div>
//             <div>
//               <Label text="勤務形態" isRequired={true} />
//               <select
//                 id="workStyle"
//                 {...register("projectInfo.workStyle")}
//                 className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
//               >
//                 <option value="">選択してください</option>
//                 {workStyles.map(style => (
//                   <option key={style} value={style}>{style}</option>
//                 ))}
//               </select>
//               <ErrorMessage message={errors.projectInfo?.workStyle?.message} />
//             </div>
//             <div>
//               <Label text="ポジション" isRequired={true} />
//               <select
//                 id="position"
//                 {...register("projectInfo.position")}
//                 className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
//               >
//                 <option value="">選択してください</option>
//                 {positions.map(pos => (
//                   <option key={pos} value={pos}>{pos}</option>
//                 ))}
//               </select>
//               <ErrorMessage message={errors.projectInfo?.position?.message} />
//             </div>
//             <div>
//               <Label text="主要技術(言語、FW)" isRequired={true} />
//               <input
//                 type="text"
//                 id="mainTechnology"
//                 {...register("projectInfo.mainTechnology")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.projectInfo?.mainTechnology?.message} />
//             </div>
//             <div>
//               <Label text="データベース" isRequired={true} />
//               <input
//                 type="text"
//                 id="database"
//                 {...register("projectInfo.database")}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.projectInfo?.database?.message} />
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">進捗状況</h2>
//             <div>
//               <Label text="全体状況" isRequired={true} />
//               <textarea
//                 id="overallProgress"
//                 {...register("overallProgress")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.overallProgress?.message} />
//             </div>

//             <div className="mt-6 space-y-6">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="font-semibold">タスク(最大5つ)</h3>
//                 <button
//                   type="button"
//                   onClick={handleAddTask}
//                   disabled={fields.length >= 5}
//                   className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-full text-sm disabled:bg-gray-400"
//                 >
//                   タスク追加
//                 </button>
//               </div>
//               <ErrorMessage message={errors.tasks?.message} />
//               {fields.map((field, index) => (
//                 <div key={field.id} className="space-y-4 border p-3 rounded-md">
//                   <div className="flex justify-between items-center">
//                     <h4 className="font-semibold text-gray-600">タスク {index + 1}</h4>
//                     {fields.length > 1 && (
//                       <button type="button"
//                         onClick={() => handleRemoveTask(index)}
//                         className="text-red-500 hover:text-red-700 text-sm"
//                       >
//                         削除
//                       </button>
//                     )}
//                   </div>
//                   <div>
//                     <Label text="タスク名" isRequired={true} />
//                     <input
//                       type="text"
//                       {...register(`tasks.${index}.taskName`)}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                     <ErrorMessage message={errors.tasks?.[index]?.taskName?.message} />
//                   </div>
//                   <div>
//                     <Label text="状況" isRequired={true} />
//                     <textarea
//                       {...register(`tasks.${index}.status`)}
//                       rows={2}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     ></textarea>
//                     <ErrorMessage message={errors.tasks?.[index]?.status?.message} />
//                   </div>
//                   <div>
//                     <Label text="問題・課題" />
//                     <textarea
//                       {...register(`tasks.${index}.problem`)}
//                       rows={2}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     ></textarea>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <Label text="今後の予定" isRequired={true} />
//               <textarea
//                 id="futurePlans"
//                 {...register("futurePlans")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//               <ErrorMessage message={errors.futurePlans?.message} />
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">その他</h2>
//             <div>
//               <Label text="顧客状況" />
//               <textarea
//                 id="customerStatus"
//                 {...register("otherInfo.customerStatus")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//             <div>
//               <Label text="営業情報" />
//               <textarea
//                 id="salesInfo"
//                 {...register("otherInfo.salesInfo")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//             <div>
//               <Label text="健康状態" />
//               <textarea
//                 id="healthStatus"
//                 {...register("otherInfo.healthStatus")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//             <div>
//               <Label text="休暇予定" />
//               <textarea
//                 id="vacationPlans"
//                 {...register("otherInfo.vacationPlans")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg bg-gray-50 space-y-6">
//             <h2 className="text-xl font-semibold mb-3">上司へ相談</h2>
//             <div>
//               <Label text="相談内容" />
//               <textarea
//                 id="consultation"
//                 {...register("consultation")}
//                 rows={4}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//           </section>

//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={handleBackToList}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
//             >
//               一覧へ戻る
//             </button>
//             <button
//               type="submit"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
//             >
//               確認画面へ進む
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-6">
//           <ConfirmationView formData={formData} />
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={() => setStep("input")}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
//             >
//               修正する
//             </button>
//             <button
//               type="button"
//               onClick={handleApiSubmit}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
//             >
//               この内容で提出する
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }