import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    // Обновляем цвет темы в манифесте
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const themeColorMetaManifest = document.querySelector(
      'link[rel="manifest"]'
    );

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        isDarkMode ? "#000000" : "#f5f5f5"
      );
    }

    // Здесь можно попробовать вручную обновить ссылку на манифест, если нужно:
    if (themeColorMetaManifest) {
      const link = themeColorMetaManifest.getAttribute("href");
      if (link) {
        fetch(link)
          .then((response) => response.json())
          .then((manifest) => {
            // Меняем theme_color в манифесте
            manifest.theme_color = isDarkMode ? "#000000" : "#f5f5f5";
            // Переопределяем манифест на лету
            const newManifest = document.createElement("script");
            newManifest.type = "application/json";
            newManifest.textContent = JSON.stringify(manifest);
            document.head.appendChild(newManifest);
          });
      }
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
