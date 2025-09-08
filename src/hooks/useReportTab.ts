import { Tab } from "@/Constants/reportConstants";
import { useState } from "react";

export const useReportsTab = () => {
  // タブの選択状態
  const [activeTab, setActiveTab] = useState<Tab>("published");

  // タブ押下時のハンドラー
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange,
  };
};