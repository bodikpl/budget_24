import useTheme from "../../lib/useTheme";

const ThemeToggle = ({ theme }: { theme: string }) => {
  const { toggleTheme } = useTheme();
  const handleClick = () => toggleTheme();

  return (
    <button
      title="Theme toggle"
      type="button"
      onClick={() => handleClick()}
      className="flex gap-4 items-center"
    >
      <ThemeIcon active={theme === "dark"} />
      <p>Сменить тему</p>
    </button>
  );
};

export default ThemeToggle;

function ThemeIcon({ active = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
      <path
        className={`${
          active ? "fill-black dark:fill-white" : "fill-black dark:fill-white"
        }`}
        d="M15 10a5 5 0 0 0 0 10V10Z"
      />
      <path
        className={`${
          active ? "fill-black dark:fill-white" : "fill-black dark:fill-white"
        }`}
        fillRule="evenodd"
        d="M15 27.5c6.904 0 12.5-5.596 12.5-12.5 0-6.903-5.596-12.5-12.5-12.5C8.097 2.5 2.5 8.097 2.5 15c0 6.904 5.597 12.5 12.5 12.5Zm0-2.5v-5a5 5 0 0 0 0-10V5C9.477 5 5 9.477 5 15s4.477 10 10 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
