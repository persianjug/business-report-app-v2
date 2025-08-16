import { useRouter } from "next/navigation";

export const useReportEditActions = (reportId: string | number) => {
  const router = useRouter();

  const handleBackToDetail = () => {
    router.push(`/reports/${reportId}`);
  };

  return {
    handleBackToDetail,
  };
};
