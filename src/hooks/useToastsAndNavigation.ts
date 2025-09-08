import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useToastsAndNavigation = () => {
  const router = useRouter();

  const handleSuccess = (message: string, path?: string) => {
    toast.success(message);
    if (path) {
      setTimeout(() => router.push(path), 2000);
    }
  };

  const handleError = (error: Error, message: string) => {
    console.error(message, error);
    toast.error(message);
  };

  return {
    handleSuccess,
    handleError,
  };
};
