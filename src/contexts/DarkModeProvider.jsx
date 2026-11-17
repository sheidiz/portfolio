import { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { DarkModeContext } from "./DarkModeContext";

const THEME_STORAGE_KEY = "theme";

const getStoredTheme = () => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
  } catch {
    // Persistence is optional.
  }

  return null;
};

const getSystemTheme = () => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
};

export const DarkModeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(getStoredTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemTheme);
  const isDarkMode = themePreference
    ? themePreference === "dark"
    : systemPrefersDark;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event) => setSystemPrefersDark(event.matches);

    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    if (!themePreference) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
      // Theme preference persistence is optional.
    }
  }, [themePreference]);

  const toggleTheme = () => {
    setThemePreference(isDarkMode ? "light" : "dark");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
