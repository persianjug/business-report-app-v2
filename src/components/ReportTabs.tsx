"use client";

import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Tab } from "@/Constants/reportConstants";

interface ReportsTabsProps {
  activeTab: Tab;
}

const ReportsTabs = ({ activeTab }: ReportsTabsProps) => {
  const pathname = usePathname();

  const tabClass = (tab: string) =>
    classnames(
      "flex-1 text-center py-2 font-bold transition-colors duration-200",
      {
        "text-blue-600": activeTab === tab,
        "text-gray-200 hover:text-gray-600": activeTab !== tab,
      }
    );

  const totalTabs = ["all", "published", "drafts"].length;
  const activeTabIndex = ["all", "published", "drafts"].indexOf(activeTab);

  return (
    <div className="md:w-4/10 mb-8">
      <div className="flex justify-center mb-1">
        <Link href={`${pathname}?tab=all`} className={tabClass("all")} prefetch={false}>
          すべて
        </Link>
        <Link href={`${pathname}?tab=published`} className={tabClass("published")} prefetch={false}>
          登録済み
        </Link>
        <Link href={`${pathname}?tab=drafts`} className={tabClass("drafts")} prefetch={false}>
          下書き
        </Link>
      </div>
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
        {/* h-1 bg-gray-200 rounded-fullで背景となるバーを作成します。 */}
        {/* overflow-hiddenで、バーからはみ出る要素を隠します。 */}
        {/* 内側のdivが実際に動くプログレスバーです。 */}
        {/* width: \${100 / totalTabs}%```: タブの数に基づいて、バーの幅を動的に計算します（例: 3つのタブなら約33.3%）。 */}
        {/* left: \${(100 / totalTabs) * activeTabIndex}%```: 現在アクティブなタブのインデックスに基づいて、バーの左端の位置を計算します。 */}
        {/* transition-all duration-300 ease-in-out: タブを切り替えたときに、バーが滑らかにスライドするようにアニメーションを設定します。 */}
        <div
          className="absolute h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / totalTabs}%`,
            left: `${(100 / totalTabs) * activeTabIndex}%`
          }}
        />
      </div>
    </div>
  );
};

export default ReportsTabs;