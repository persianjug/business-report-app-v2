import { Tab } from "@/Constants/reportConstants";
import { useState } from "react";

export const useReportsTab = () => {
  const [activeTab, setActiveTab] = useState<Tab>("published");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange,
  };
};