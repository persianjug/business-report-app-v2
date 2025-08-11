import { useEffect, RefObject } from "react";

// TはRefObjectが参照する要素の型
const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // refが存在しない、またはrefの要素内にクリックイベントのターゲットが含まれている場合は何もしない
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;