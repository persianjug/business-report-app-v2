"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import classnames from "classnames";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // スクロール位置が0より大きい場合に表示
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
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
      onClick={scrollToTop}
      className={classnames(
        "fixed bottom-20 right-14 p-3 bg-gray-600 text-white rounded-full shadow-lg transition-opacity duration-300 z-50",
        {
          "opacity-100 visible": isVisible,
          "opacity-0 invisible": !isVisible,
        }
      )}
      aria-label="ページ上部へスクロール"
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
