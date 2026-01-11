
import { useEffect } from "react";

export function useApplyTheme() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  });
}
