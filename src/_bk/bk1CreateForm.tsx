// "use client";

// import { REPORT_INITIAL_DATA } from "@/Constants/reportConstants";
// import BackToListButton from "./BackToListButton";
// import Button from "./bkButton";
// import ConfirmationView from "./ConfirmationView";
// import { InputForm } from "./InputForm";
// import { useReportForm } from "@/hooks/useReportForm";

// export default function CreateForm() {
//   const {
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
//     handleLoadLatest,
//     handleBackToList,
//   } = useReportForm(REPORT_INITIAL_DATA);

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">業務報告書{step === "confirm" ? "確認" : "作成"}</h1>
//         {step === "input" && (
//           <BackToListButton onClick={handleBackToList} />
//         )}
//       </div>
//       {step === "input" ? (
//         <InputForm
//           handleSubmit={handleSubmit(onSubmitToConfirm)}
//           register={register}
//           control={control}
//           errors={errors}
//           fields={fields}
//           handleAddTask={handleAddTask}
//           handleRemoveTask={handleRemoveTask}
//           handleLoadLatest={handleLoadLatest}
//           hasReports={hasReports}
//         />
//       ) : (
//         <div className="space-y-6">
//           <ConfirmationView formData={formData} isConfirm={true} isEditMode={false} />
//           <div className="flex justify-between mt-6">
//             <Button
//               variant="secondary"
//               onClick={() => setStep("input")} >修正する</Button>
//             <Button
//               type="button"
//               variant="success"
//               onClick={handleApiPostSubmit}>この内容で提出する</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }