import { FormData } from "@/schemas/reportSchema";
import { UseFormRegister } from "react-hook-form";
import FormSection from "./FormSection";
import Textarea from "./Textarea";

type ConsultationSectionProps = {
  register: UseFormRegister<FormData>;
};

export const ConsultationSection = ({ register }: ConsultationSectionProps) => {
  return (
    <FormSection title="上司へ相談">
      <Textarea
        label="相談内容"
        id="consultation"
        register={register("consultation")}
        rows={6}
      />
    </FormSection>
  );
};