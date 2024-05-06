"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState("");
  const handleTooltipVisibility = (tooltipId: string) => {
    setTooltipVisible(tooltipId === tooltipVisible ? "" : tooltipId);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("[data-tooltip-target]")) {
        setTooltipVisible("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed bottom-0 z-20 w-full border-t border-gray-200 bg-[#c8ccd2] shadow-xl dark:bg-[#181818]">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto md:hidden">
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <i className="fa fa-solid fa-house text-xl"></i>
          <span className="sr-only">Home</span>
        </button>
        {/* Tooltip for Home */}
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            tooltipVisible === "tooltip-home" ? "visible" : "invisible"
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
         <i className="fa fa-solid fa-newspaper text-xl"></i>
          <span className="sr-only">Home</span>
        </button>
        {/* Tooltip for Home */}
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            tooltipVisible === "tooltip-home" ? "visible" : "invisible"
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
         <i className="fa fa-solid fa-plus text-xl"></i>
          <span className="sr-only">Home</span>
        </button>
        {/* Tooltip for Home */}
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            tooltipVisible === "tooltip-home" ? "visible" : "invisible"
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          
          <i className="fa fa-regular fa-bell text-xl"></i>
          <span className="sr-only">Home</span>
        </button>
        {/* Tooltip for Home */}
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            tooltipVisible === "tooltip-home" ? "visible" : "invisible"
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          onClick={() => router.push("/")}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <i className="fas fa-solid fa-circle-user"></i>
          <span className="sr-only">Home</span>
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          className={`absolute z-10 ${
            tooltipVisible === "tooltip-home" ? "visible" : "invisible"
          } inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        {/* Add other buttons and tooltips here */}
      </div>
    </div>
  );
}
