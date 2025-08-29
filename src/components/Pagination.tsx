"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pageRange = 5; // 表示するページ番号の数

  // ページ番号の表示範囲を計算する関数
  const getPageNumbers = () => {
    const pages = [];

    // 総ページ数が表示範囲より少ない場合は、全てのページを表示
    if (totalPages <= pageRange) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 現在のページを中心として表示範囲を計算
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = startPage + pageRange - 1;

    // 表示範囲が総ページ数を超えないように調整
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - pageRange + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // ページリンクを作成する関数
  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex justify-end items-center mt-8 space-x-2">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={createPageLink(currentPage - 1)}
          className="px-3 py-1 border rounded-md text-gray-400 hover:bg-gray-100"
        >
          &lt;
        </Link>
      ) : (
        <span
          className="px-3 py-1 border rounded-md text-gray-200 cursor-not-allowed"
          aria-disabled="true"
        >
          &lt;
        </span>
      )}
      {/* ページ番号ボタン */}
      {getPageNumbers().map((pageNumber) => (
        <Link
          key={pageNumber}
          href={createPageLink(pageNumber)}
          className={`
            px-4 py-2 border rounded-md
            ${pageNumber === currentPage ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-100"}
          `}
        >
          {pageNumber}
        </Link>
      ))}

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={createPageLink(currentPage + 1)}
          className="px-3 py-1 border rounded-md text-gray-400 hover:bg-gray-100"
        >
          &gt;
        </Link>
      ) : (
        <span
          className="px-3 py-1 border rounded-md text-gray-200 cursor-not-allowed"
          aria-disabled="true"
        >
          &gt;
        </span>
      )}
    </div>
  );
};

export default Pagination;