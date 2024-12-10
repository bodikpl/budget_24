import { text } from "../../lib/lang";
import { languages, useCurrentLanguage } from "../../lib/LangContext";
import { cn } from "../../lib/utils";

export default function LanguageToogle() {
  const { userLanguage, changeLanguages } = useCurrentLanguage();
  const switchToUA = () => changeLanguages(languages[0]);
  const switchToPL = () => changeLanguages(languages[1]);
  const switchToEN = () => changeLanguages(languages[2]);
  const switchToRU = () => changeLanguages(languages[3]);

  return (
    <div>
      <p>{text.changeLanguage[userLanguage]}</p>
      <div className="grid grid-cols-4 gap-2 text-xs">
        <button
          onClick={switchToUA}
          className={cn(
            "btn_2",
            userLanguage === "ua" && "border border-red-500"
          )}
        >
          UA
        </button>
        <button
          onClick={switchToPL}
          className={cn(
            "btn_2",
            userLanguage === "pl" && "border border-red-500"
          )}
        >
          PL
        </button>
        <button
          onClick={switchToEN}
          className={cn(
            "btn_2",
            userLanguage === "eng" && "border border-red-500"
          )}
        >
          EN
        </button>
        <button
          onClick={switchToRU}
          className={cn(
            "btn_2",
            userLanguage === "ru" && "border border-red-500"
          )}
        >
          RU
        </button>
      </div>
    </div>
  );
}
