"use client";

import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 上向きボタンの表示ロジック
    // スクロール位置が0より大きい場合に表示
    setShowScrollToTop(window.scrollY > 0);

    // 下向きボタンの表示ロジック
    // ページの最下部に到達していない場合に表示
    setShowScrollToBottom(scrollTop + clientHeight < scrollHeight);

    setLastScrollY(window.scrollY);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期表示時に状態をセット
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-14 right-16 flex flex-col items-end space-y-10 z-50">
      <button
        onClick={scrollToTop}
        className={classnames(
          "p-3 bg-gray-600 text-white rounded-full shadow-lg transition-opacity duration-300 w-16",
          {
            "opacity-100 visible": showScrollToTop,
            "opacity-0 invisible": !showScrollToTop,
          }
        )}
        aria-label="ページ上部へスクロール"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Top</span>
          <FaArrowUp className="w-5 h-5 text-center" />
        </div>
      </button>

      <button
        onClick={scrollToBottom}
        className={classnames(
          "p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300 w-16",
          {
            "opacity-100 visible": showScrollToBottom,
            "opacity-0 invisible": !showScrollToBottom,
          }
        )}
        aria-label="ページ下部へスクロール"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Down</span>
          <FaArrowDown className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};

export default ScrollButtons;
