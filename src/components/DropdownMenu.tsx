"use client";

import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import { HiDotsVertical } from "react-icons/hi";

// メニュー項目の型を定義
interface MenuItem {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  disabled?: boolean;
  isDestructive?: boolean; // 削除など、危険なアクションを示すプロパティ
  icon?: IconType;
}

interface DropdownMenuProps {
  items: MenuItem[];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // コンポーネントのDOM要素を参照するためのRef

  // カスタムフックを使って、refの外側がクリックされたら閉じる
  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-full text-gray-700
           hover:bg-blue-50 hover:font-bold focus:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <HiDotsVertical className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-50 ring-1 ring-gray-200 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => {
              const isLastItem = index === items.length - 1;
              const itemClasses = `flex items-center w-full text-left px-4 py-2 text-sm
                ${item.isDestructive ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}
                ${item.disabled ? "text-gray-400 cursor-not-allowed" : ""}
                ${!isLastItem ? "border-b border-gray-200" : ""}`;

              const Icon = item.icon;

              if (item.href) {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={itemClasses}
                  >
                    {Icon && <Icon className="mr-2 h-5 w-5" />}
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={(e) => {
                    item.onClick?.(e);
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={itemClasses}
                  role="menuitem"
                >
                  {Icon && <Icon className="mr-2 h-5 w-5" />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
