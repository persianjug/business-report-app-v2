import { Tab } from "@/Constants/reportConstants";
import classNames from "classnames";
import Link from "next/link";

interface ReportsTabsProps {
  activeTab: Tab
}

const ReportsTabs = ({ activeTab }: ReportsTabsProps) => {
  const tabClass = (tab: Tab) =>
    classNames(
      "px-4 py-2 text-lg border-b-4 transition-colors duration-200 w-24 text-center",
      {
        "border-blue-500 text-blue-500 font-semibold": activeTab === tab,
        "border-transparent text-gray-300 hover:text-gray-500": activeTab !== tab,
      }
    );

  return (
    // <div className="flex justify-start space-x-2 mb-8 bg-gray-100 p-2 rounded-lg">
    <div className="flex justify-start space-x-2 mb-8 p-2">
      <Link
        href={`?tab=all`}
        className={tabClass("all")}
        prefetch={false}
      >
        すべて
      </Link>
      <Link
        href={`?tab=published`}
        className={tabClass("published")}
        prefetch={false}
      >
        登録済
      </Link>
      <Link
        href={`?tab=drafts`}
        className={tabClass("drafts")}
        prefetch={false}
      >
        下書き
      </Link>
    </div>
  );
};

export default ReportsTabs;
