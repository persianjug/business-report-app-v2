// src/components/NotificationBanner.tsx
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface NotificationBannerProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number; // 自動的に非表示になるまでの時間（ミリ秒）
}

const NotificationBanner = ({
  message,
  type,
  onClose,
  duration = 3000,
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // 指定された時間後に自動的に非表示にする
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // 親コンポーネントの状態もリセット
    }, duration);

    return () => clearTimeout(timer); // クリーンアップ
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const icon =
    type === "success" ? (
      <FaCheckCircle className="w-5 h-5" />
    ) : (
      <FaExclamationCircle className="w-5 h-5" />
    );

  return isVisible ? (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50 
        px-6 py-3 rounded-md shadow-lg text-white font-medium 
        flex items-center space-x-2 transition-all duration-300 transform ${bgColor}`}
    >
      {icon}
      <span>{message}</span>
    </div>
  ) : null;
};

export default NotificationBanner;