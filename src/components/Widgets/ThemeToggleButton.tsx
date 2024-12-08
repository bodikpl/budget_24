import { useDarkMode } from "../../lib/useDarkMode";

type ThemeToggleButtonProps = {};

export default function ThemeToggleButton({}: ThemeToggleButtonProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-black text-black dark:text-white px-4 h-10 rounded-lg leading-none mt-4"
    >
      {isDarkMode ? "Светлая тема" : "Темная тема"}
    </button>
  );
}
