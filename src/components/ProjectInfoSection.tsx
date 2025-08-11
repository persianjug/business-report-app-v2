import { WORK_STYLES, POSITIONS } from "@/Constants/reportConstants";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/schemas/reportSchema";
import CommuteTimeInput from "./CommuteTimeInput";
import FormSection from "./FormSection";
import Input from "./Input";
import Select from "./Select";

interface ProjectInfoSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export const ProjectInfoSection = ({ register, errors }: ProjectInfoSectionProps) => {
  return (
    <FormSection title="案件情報">
      <Input
        label="案件名"
        id="projectName"
        isRequired={true}
        register={register("projectInfo.projectName")}
        errorMessage={errors.projectInfo?.projectName?.message}
      />
      <Input
        label="参画日"
        id="participationDate"
        isRequired={true}
        type="date"
        register={register("projectInfo.participationDate")}
        errorMessage={errors.projectInfo?.participationDate?.message}
        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
      />
      <Input
        label="参画人数"
        id="numberOfParticipants"
        isRequired={true}
        type="number"
        register={register("projectInfo.numberOfParticipants", { valueAsNumber: true })}
        errorMessage={errors.projectInfo?.numberOfParticipants?.message}
        className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2"
      />
      <CommuteTimeInput
        label="通勤時間"
        isRequired={true}
        hoursRegister={register("projectInfo.commuteHours", { valueAsNumber: true })}
        minutesRegister={register("projectInfo.commuteMinutes", { valueAsNumber: true })}
        hoursError={errors.projectInfo?.commuteHours?.message}
        minutesError={errors.projectInfo?.commuteMinutes?.message}
      />
      <Select
        label="勤務形態"
        id="workStyle"
        isRequired={true}
        register={register("projectInfo.workStyle")}
        errorMessage={errors.projectInfo?.workStyle?.message}
        options={WORK_STYLES}
        className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
      />
      <Select
        label="ポジション"
        id="position"
        isRequired={true}
        register={register("projectInfo.position")}
        errorMessage={errors.projectInfo?.position?.message}
        options={POSITIONS}
        className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
      />
      <Input
        label="主要技術(言語、FW)"
        id="mainTechnology"
        isRequired={true}
        register={register("projectInfo.mainTechnology")}
        errorMessage={errors.projectInfo?.mainTechnology?.message}
      />
      <Input
        label="データベース"
        id="database"
        isRequired={true}
        register={register("projectInfo.database")}
        errorMessage={errors.projectInfo?.database?.message}
      />
    </FormSection>
  );
};