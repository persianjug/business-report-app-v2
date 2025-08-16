import { FormData } from "@/schemas/reportSchema";
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from "react-hook-form";
import AddTaskButton from "./AddTaskButton";
import ErrorMessage from "./ErrorMessage";
import FormSection from "./FormSection";
import TaskInputItem from "./TaskInputItem";
import Textarea from "./Textarea";

interface ProgressInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  fields: UseFieldArrayReturn<FormData, "tasks">["fields"];
  handleAddTask: () => void;
  handleRemoveTask: (index: number) => void;
};

export const ProgressInfoSection = ({
  register,
  errors,
  fields,
  handleAddTask,
  handleRemoveTask,
}: ProgressInfoSectionProps) => {
  return (
    <FormSection title="進捗状況">
      <Textarea
        label="全体状況"
        id="overallProgress"
        isRequired={true}
        register={register("overallProgress")}
        errorMessage={errors.overallProgress?.message}
        rows={6}
      />
      <div className="mt-6 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">タスク(最大5つ)</h3>
          <AddTaskButton onClick={handleAddTask} disabled={fields.length >= 5} />
        </div>
        <ErrorMessage message={errors.tasks?.message} />
        {fields.map((field, index) => (
          <TaskInputItem
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            onRemove={() => handleRemoveTask(index)}
            isRemovable={fields.length > 1}
          />
        ))}
      </div>
      <Textarea
        label="今後の予定"
        id="futurePlans"
        isRequired={true}
        register={register("futurePlans")}
        errorMessage={errors.futurePlans?.message}
        rows={6}
      />
    </FormSection>
  );
};