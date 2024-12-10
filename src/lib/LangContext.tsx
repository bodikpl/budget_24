import { createContext, useContext, useEffect, useState } from "react";

export const languages = ["ua", "eng"];

export const text: any = {
  photo: {
    ua: "Фотографія",
    eng: "Photo",
  },
};

interface LangContextType {
  userLanguage: string;
  changeLanguages: (lang: string) => void;
}

const LangContext = createContext<LangContextType | null>(null);

export const LangContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLanguage, setUserLanguage] = useState("");

  useEffect(() => {
    let value;
    value = localStorage.getItem("lang") || languages[0];
    setUserLanguage(value);
  }, []);

  const changeLanguages = (lang: string) => {
    window.localStorage.setItem("lang", lang);
    setUserLanguage(window.localStorage.getItem("lang") || languages[0]);
  };

  return (
    <LangContext.Provider value={{ userLanguage, changeLanguages }}>
      {children}
    </LangContext.Provider>
  );
};

export const CurrentLanguage = () => {
  return useContext(LangContext);
};
