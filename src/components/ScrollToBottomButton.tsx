"use client";

import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import classnames from "classnames";

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // ページの高さとスクロール位置、ビューポートの高さを取得
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // ページの最下部に到達していない場合に表示
    if (scrollTop + clientHeight < scrollHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToBottom}
      className={classnames(
        "fixed bottom-10 right-14 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300 z-50",
        {
          "opacity-100 visible": isVisible,
          "opacity-0 invisible": !isVisible,
        }
      )}
      aria-label="ページ下部へスクロール"
    >
      <FaArrowDown className="w-5 h-5" />
    </button>
  );
};

export default ScrollToBottomButton;
