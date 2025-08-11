import { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";

interface TaskInputItemProps {
  index: number;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  onRemove: () => void;
  isRemovable: boolean;
};

const TaskInputItem = ({
  index,
  register,
  errors,
  onRemove,
  isRemovable,
}: TaskInputItemProps) => {
  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-1">
        <h6 className="font-semibold text-gray-700">{`【タスク ${index + 1}】`}</h6>
        {isRemovable && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            削除
          </button>
        )}
      </div>
      {/* <h3 className="font-semibold text-gray-600">{`・タスク ${index + 1}`}</h3> */}
      <div className="space-y-4 p-8 pt-0 border border-gray-300 rounded-md shadow-sm bg-pink-50">
        {/* <div className="space-y-4 border p-3 rounded-md"> */}
        {/* <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">{`・タスク ${index + 1}`}</h3>
          {isRemovable && (
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              削除
            </button>
          )}
        </div> */}
        <Input
          label="タスク名"
          id={`tasks.${index}.taskName`}
          isRequired={true}
          register={register(`tasks.${index}.taskName`)}
          errorMessage={errors.tasks?.[index]?.taskName?.message}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
        />
        <Textarea
          label="状況"
          id={`tasks.${index}.status`}
          isRequired={true}
          rows={2}
          register={register(`tasks.${index}.status`)}
          errorMessage={errors.tasks?.[index]?.status?.message}
        />
        <Textarea
          label="問題・課題"
          id={`tasks.${index}.problem`}
          rows={2}
          register={register(`tasks.${index}.problem`)}
          errorMessage={errors.tasks?.[index]?.problem?.message}
        />
      </div>
    </>
  );
};

export default TaskInputItem;