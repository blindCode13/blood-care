// useThemeToggle.js
export function useThemeToggle() {
  const toggleTheme = () => {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "dark" ? "light" : "dark";

    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return toggleTheme;
}
