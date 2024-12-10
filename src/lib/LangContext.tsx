import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "./types";

// Список языков
export const languages: Language[] = ["ua", "pl", "eng", "ru"];

// Интерфейс контекста
interface LangContextType {
  userLanguage: Language;
  changeLanguages: (lang: Language) => void;
}

// Создаем контекст с начальным значением null
const LangContext = createContext<LangContextType | null>(null);

// Провайдер контекста
export const LangContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLanguage, setUserLanguage] = useState<Language>("ua"); // Значение по умолчанию

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && languages.includes(storedLang as Language)) {
      setUserLanguage(storedLang as Language); // Безопасное преобразование
    }
  }, []);

  const changeLanguages = (lang: Language) => {
    localStorage.setItem("lang", lang);
    setUserLanguage(lang);
  };

  return (
    <LangContext.Provider value={{ userLanguage, changeLanguages }}>
      {children}
    </LangContext.Provider>
  );
};

// Хук для использования контекста
export const useCurrentLanguage = (): LangContextType => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error(
      "useCurrentLanguage must be used within a LangContextProvider"
    );
  }
  return context;
};
