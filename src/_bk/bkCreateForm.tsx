// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/utils/axios";

// // 選択肢を定数として定義
// const positions = ["PG", "SE", "SE(社員代替)", "テスター", "オペレーター", "PL", "PM", "社員代替"];
// const workStyles = ["併用勤務(在宅率6割以上)", "併用勤務(在宅率6割未満)", "現場勤務", "在宅勤務"];

// export default function CreateForm() {
//   const router = useRouter();
//   const [hasReports, setHasReports] = useState(false); // 報告書が存在するかどうかを管理する状態
//   const [isDirty, setIsDirty] = useState(false);
//   const [step, setStep] = useState("input");
//   const [formData, setFormData] = useState({
//     startDate: "",
//     endDate: "",
//     customerInfo: {
//       endClient: "",
//       upperClient: "",
//       industry: "",
//       nearestStation: "",
//     },
//     projectInfo: {
//       projectName: "",
//       participationDate: "",
//       numberOfParticipants: 0,
//       commuteHours: 0,
//       commuteMinutes: 0,
//       workStyle: "",
//       position: "",
//       mainTechnology: "",
//       database: "",
//     },
//     overallProgress: "",
//     tasks: [{ taskName: "", status: "", problem: "" }],
//     futurePlans: "",
//     otherInfo: {
//       customerStatus: "",
//       salesInfo: "",
//       healthStatus: "",
//       vacationPlans: "",
//     },
//     consultation: "",
//   });

//   // フォームの初期値を設定する
//   useEffect(() => {
//     setFormData({
//       startDate: "",
//       endDate: "",
//       customerInfo: {
//         endClient: "", upperClient: "", industry: "", nearestStation: "",
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
//       // id: undefined, // 新規作成のためIDは不要
//       // createdAt: undefined // 新規作成のため作成日は不要
//     });
//   }, []);

//   // 報告書が存在するかどうかをAPIから確認
//   useEffect(() => {
//     const checkReports = async () => {
//       try {
//         const response = await api.get<boolean>("/reports/has-data");
//         setHasReports(response.data);
//         console.log(`hasReports: ${hasReports}`);
//       } catch (error) {
//         console.error("報告書の存在確認に失敗しました:", error);
//       }
//     };
//     checkReports();
//   }, []);

//   // ★ 新しい関数: APIを呼び出してデータを登録/更新する
//   const handleApiSubmit = async () => {
//     try {
//       // 登録処理
//       await api.post("/reports", formData);
//       alert("報告書が正常に作成されました");
//       router.push("/reports");
//     } catch (error) {
//       console.error("報告書の作成に失敗しました:", error);
//       alert("報告書の作成に失敗しました");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // ネストされたオブジェクトの更新をハンドリング
//     const [parent, child] = name.split(".");
//     if (child) {
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//       setIsDirty(true);
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//       setIsDirty(true);
//     }
//   };

//   const handleTaskChange = (index: number, e) => {
//     const { name, value } = e.target;
//     const newTasks = [...formData.tasks];
//     newTasks[index] = { ...newTasks[index], [name]: value };
//     setFormData(prev => ({ ...prev, tasks: newTasks }));
//     setIsDirty(true);
//   };

//   const handleAddTask = () => {
//     setFormData(prev => ({
//       ...prev,
//       tasks: [...prev.tasks, { taskName: "", status: "", problem: "" }]
//     }));
//   };

//   const handleRemoveTask = (index: number) => {
//     // ダイアログを表示して、ユーザーの確認を求める
//     if (window.confirm("本当にこのタスクを削除しますか？")) {
//       const newTasks = formData.tasks.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, tasks: newTasks }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/reports", formData);
//       alert("報告書が正常に作成されました");
//       router.push("/reports"); // 報告書一覧ページにリダイレクト
//     } catch (error) {
//       console.error("報告書の作成に失敗しました:", error);
//       alert("報告書の作成に失敗しました");
//     }
//   };

//   const handleLoadLatest = async () => {
//     // フォームに何らかの入力がある場合のみダイアログを表示
//     if (isDirty) {
//       const shouldLoad = window.confirm(
//         "現在入力中の内容は保存されません。最新の報告書を読み込みますか？"
//       );
//       if (!shouldLoad) {
//         // ユーザーが「キャンセル」を選んだ場合は処理を中断
//         return;
//       }
//     }

//     try {
//       const response = await api.get<Report>("/reports/latest");
//       const latestReport = response.data;

//       // 最新の報告書のデータをフォームにセット
//       setFormData({
//         ...latestReport,
//         id: undefined,
//         createdAt: undefined,
//         overallProgress: "",
//         tasks: latestReport.tasks && latestReport.tasks.length > 0
//           ? latestReport.tasks.map(task => ({ ...task, status: "", problem: "" }))
//           : [{ taskName: "", status: "", problem: "" }],
//       }); alert("最新の報告書データを読み込みました");
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

//   if (!formData) {
//     return null;
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">業務報告書作成</h1>
//         <button
//           type="button"
//           onClick={handleLoadLatest}
//           disabled={!hasReports}
//           className={`
//             font-bold py-2 px-4 rounded-md shadow-md
//             ${hasReports
//               ? "bg-purple-600 hover:bg-purple-700 text-white"
//               : "bg-gray-400 text-gray-700 cursor-not-allowed"}
//           `}
//         >
//           最新の報告書を読み込む
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">基本情報</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">報告対象期間</label>
//             <div className="mt-1 flex space-x-4">
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//               <span className="self-center">〜</span>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               />
//             </div>
//           </div>
//         </section>

//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">顧客情報</h2>
//           <div>
//             <label htmlFor="customerInfo.endClient" className="block text-sm font-medium text-gray-700">エンド企業</label>
//             <input
//               type="text"
//               id="customerInfo.endClient"
//               name="customerInfo.endClient"
//               value={formData.customerInfo.endClient}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="customerInfo.upperClient" className="block text-sm font-medium text-gray-700">上位企業</label>
//             <input
//               type="text"
//               id="customerInfo.upperClient"
//               name="customerInfo.upperClient"
//               value={formData.customerInfo.upperClient}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//           <div>
//             <label htmlFor="customerInfo.industry" className="block text-sm font-medium text-gray-700">業種</label>
//             <input
//               type="text"
//               id="customerInfo.industry"
//               name="customerInfo.industry"
//               value={formData.customerInfo.industry}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//           <div>
//             <label htmlFor="customerInfo.nearestStation" className="block text-sm font-medium text-gray-700">職場最寄駅</label>
//             <input
//               type="text"
//               id="customerInfo.nearestStation"
//               name="customerInfo.nearestStation"
//               value={formData.customerInfo.nearestStation}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//         </section>

//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">案件情報</h2>
//           <div>
//             <label htmlFor="projectInfo.projectName" className="block text-sm font-medium text-gray-700">案件名</label>
//             <input
//               type="text"
//               id="projectInfo.projectName"
//               name="projectInfo.projectName"
//               value={formData.projectInfo.projectName}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="projectInfo.participationDate" className="block text-sm font-medium text-gray-700">参画日</label>
//             <input type="date"
//               id="projectInfo.participationDate"
//               name="projectInfo.participationDate"
//               value={formData.projectInfo.participationDate}
//               onChange={handleChange}
//               className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div>
//             <label htmlFor="projectInfo.numberOfParticipants" className="block text-sm font-medium text-gray-700">参画人数</label>
//             <input type="number"
//               id="projectInfo.numberOfParticipants"
//               name="projectInfo.numberOfParticipants"
//               value={formData.projectInfo.numberOfParticipants}
//               onChange={handleChange}
//               className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">通勤時間</label>
//             <div className="mt-1 flex space-x-2 items-center">
//               <input
//                 type="number"
//                 name="projectInfo.commuteHours"
//                 value={formData.projectInfo.commuteHours}
//                 onChange={handleChange}
//                 className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <span className="text-gray-500">時間</span>
//               <input
//                 type="number"
//                 name="projectInfo.commuteMinutes"
//                 value={formData.projectInfo.commuteMinutes}
//                 onChange={handleChange}
//                 className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <span className="text-gray-500">分</span>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="projectInfo.workStyle" className="block text-sm font-medium text-gray-700">勤務形態</label>
//             <select
//               id="projectInfo.workStyle"
//               name="projectInfo.workStyle"
//               value={formData.projectInfo.workStyle}
//               onChange={handleChange}
//               className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
//             >
//               <option value="">選択してください</option>
//               {workStyles.map(style => (
//                 <option key={style} value={style}>{style}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="projectInfo.position" className="block text-sm font-medium text-gray-700">ポジション</label>
//             <select
//               id="projectInfo.position"
//               name="projectInfo.position"
//               value={formData.projectInfo.position}
//               onChange={handleChange}
//               className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
//             >
//               <option value="">選択してください</option>
//               {positions.map(pos => (
//                 <option key={pos} value={pos}>{pos}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="projectInfo.mainTechnology" className="block text-sm font-medium text-gray-700">主要技術(言語、FW)</label>
//             <input
//               type="text"
//               id="projectInfo.mainTechnology"
//               name="projectInfo.mainTechnology"
//               value={formData.projectInfo.mainTechnology}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//           <div>
//             <label htmlFor="projectInfo.database" className="block text-sm font-medium text-gray-700">データベース</label>
//             <input
//               type="text"
//               id="projectInfo.database"
//               name="projectInfo.database"
//               value={formData.projectInfo.database}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//         </section>

//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">進捗状況</h2>
//           <div>
//             <label htmlFor="overallProgress" className="block text-sm font-medium text-gray-700">全体状況</label>
//             <textarea
//               id="overallProgress"
//               name="overallProgress"
//               value={formData.overallProgress}
//               onChange={handleChange}
//               rows={4}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>

//           <div className="mt-6 space-y-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">タスク(最大5つ)</h3>
//               <button
//                 type="button"
//                 onClick={handleAddTask}
//                 disabled={formData.tasks.length >= 5}
//                 className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-full text-sm disabled:bg-gray-400"
//               >
//                 タスク追加
//               </button>
//             </div>
//             {formData.tasks.map((task, index) => (
//               <div key={index} className="space-y-2 border p-3 rounded-md">
//                 <div className="flex justify-between items-center">
//                   <h4 className="font-medium text-gray-600">タスク {index + 1}</h4>
//                   {formData.tasks.length > 1 && (
//                     <button type="button"
//                       onClick={() => handleRemoveTask(index)}
//                       className="text-red-500 hover:text-red-700 text-sm"
//                     >
//                       削除
//                     </button>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">タスク名</label>
//                   <input
//                     type="text"
//                     name="taskName"
//                     value={task.taskName}
//                     onChange={(e) => handleTaskChange(index, e)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">状況</label>
//                   <textarea
//                     name="status"
//                     value={task.status}
//                     onChange={(e) => handleTaskChange(index, e)}
//                     rows={2}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   ></textarea>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">問題・課題</label>
//                   <textarea
//                     name="problem"
//                     value={task.problem}
//                     onChange={(e) => handleTaskChange(index, e)}
//                     rows={2}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   ></textarea>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <label htmlFor="futurePlans" className="block text-sm font-medium text-gray-700">今後の予定</label>
//             <textarea
//               id="futurePlans"
//               name="futurePlans"
//               value={formData.futurePlans}
//               onChange={handleChange}
//               rows={4}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//           </div>
//         </section>

//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">その他</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">顧客状況</label>
//             <textarea
//               name="otherInfo.customerStatus"
//               value={formData.otherInfo.customerStatus}
//               onChange={handleChange}
//               rows={3}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">営業情報</label>
//             <textarea
//               name="otherInfo.salesInfo"
//               value={formData.otherInfo.salesInfo}
//               onChange={handleChange}
//               rows={3}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">健康状況</label>
//             <textarea
//               name="otherInfo.healthStatus"
//               value={formData.otherInfo.healthStatus}
//               onChange={handleChange}
//               rows={3}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">休暇予定</label>
//             <textarea
//               name="otherInfo.vacationPlans"
//               value={formData.otherInfo.vacationPlans}
//               onChange={handleChange}
//               rows={3}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             ></textarea>
//           </div>
//         </section>

//         <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
//           <h2 className="text-xl font-semibold mb-3">上司へ相談</h2>
//           <div>
//             <label htmlFor="consultation" className="block text-sm font-medium text-gray-700">相談内容</label>
//             <textarea
//               id="consultation"
//               name="consultation"
//               value={formData.consultation}
//               onChange={handleChange}
//               rows={4}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             ></textarea>
//           </div>
//         </section>

//         <div className="flex justify-beetween mt-6">
//           <button
//             type="button"
//             onClick={handleBackToList}
//             className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md shadow-md"
//           >
//             一覧に戻る
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-md"
//           >
//             報告書を提出
//           </button>
//         </div>
//       </form>
//     </div>

//   );
// }