import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CURRENCY } from "../../lib/data";
import { Currency, Language, TextType } from "../../lib/types";
import Alert from "../Widgets/Alert";
import Modal from "../Widgets/Modal";
import SyncModalContent from "./SyncModalContent";
import ThemeToggle from "../Widgets/ThemeToggle";
import LanguageToogle from "../Widgets/LanguageToogle";

type SettingsModalContentProps = {
  userLanguage: Language;
  text: TextType;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
};

export default function SettingsModalContent({
  userLanguage,
  text,
  theme,
  setModal,
}: SettingsModalContentProps) {
  const [localMainCurrency, setLocalMainCurrency] = useLocalStorage(
    "localMainCurrency",
    ""
  );
  const [localCurrency, setLocalCurrency] = useLocalStorage<Currency[]>(
    "localCurrency",
    []
  );
  const [mainCurrency, setMainCurrency] = useState(localMainCurrency || "");

  const handleCurrencySelection = (title: string) => {
    setMainCurrency(title);
    setLocalMainCurrency(title);
    setLocalCurrency(CURRENCY);
  };

  const [tempExchangeRates, setTempExchangeRates] = useState<
    Record<string, string>
  >({});

  const handleExchangeRateChange = (id: string, newRate: string) => {
    setTempExchangeRates((prev) => ({
      ...prev,
      [id]: newRate, // Сохраняем значение как строку
    }));

    if (!isNaN(Number(newRate))) {
      setLocalCurrency((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, exchangeRate: Number(newRate) } // Конвертируем в число только если это возможно
            : item
        )
      );
    }
  };

  const [deleteAllAlert, setDeleteAllAlert] = useState(false);

  const [changeCurrencyAlert, setChangeCurrencyAlert] = useState(false);

  const [currencyForSelect, setCurrencyForSalect] = useState("");

  const [passwordModal, setPasswordModal] = useState(false);
  const [syncModal, setSyncModal] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = (text: string) => {
    if (text === import.meta.env.VITE_API_USER_PASSWORD) {
      setPassword("");
      setPasswordModal(false);
      setSyncModal(true);
    }
  };

  return (
    <>
      {syncModal && (
        <Modal
          title={text.sync[userLanguage]}
          setModal={setSyncModal}
          node={<SyncModalContent userLanguage={userLanguage} text={text} />}
        />
      )}
      {deleteAllAlert && (
        <Alert
          title={text.deleteAll[userLanguage]}
          dascription={text.confirmDeleteAll[userLanguage]}
          onClose={() => setDeleteAllAlert(false)}
          onConfirm={() => {
            localStorage.clear();
            location.reload();
          }}
        />
      )}
      {passwordModal && (
        <Modal
          title={text.enterPassword[userLanguage]}
          setModal={setPasswordModal}
          node={
            <div>
              <input
                type="password"
                className="input"
                value={password}
                autoFocus={true}
                placeholder={text.enterPassword[userLanguage]}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn_2 mt-4" onClick={() => onSubmit(password)}>
                {text.confirm[userLanguage]}
              </button>
            </div>
          }
          subModal={true}
        />
      )}
      {changeCurrencyAlert && (
        <Alert
          title={text.changeMainCurrency[userLanguage]}
          dascription={text.confirmChangeMainCurrency[userLanguage]}
          onClose={() => setChangeCurrencyAlert(false)}
          onConfirm={() => {
            handleCurrencySelection(currencyForSelect);
            setChangeCurrencyAlert(false);
          }}
        />
      )}

      <h3>
        {mainCurrency
          ? `${text.mainCurrency[userLanguage]} ${mainCurrency}`
          : text.selectFirstPrimaryCurrency[userLanguage]}
      </h3>

      <div className="mt-1 grid grid-cols-4 gap-4">
        {CURRENCY.map(({ id, title }) => (
          <button
            key={id}
            className={`${
              mainCurrency === title ? "ring-2 ring-neutral-500" : ""
            } btn_2`}
            onClick={() => {
              if (!localMainCurrency) {
                handleCurrencySelection(title);
              } else {
                setChangeCurrencyAlert(true);
                setCurrencyForSalect(title);
              }
            }}
          >
            {title}
          </button>
        ))}
      </div>

      {mainCurrency && (
        <>
          <p className="mt-4 font-aptosSemiBold">
            {text.currentRate[userLanguage]}
          </p>
          <div className="mt-1 grid grid-cols-3 gap-4">
            {localCurrency
              .filter((currency) => currency.title !== mainCurrency)
              .map(({ id, title, exchangeRate }) => (
                <div key={id} className="flex items-center">
                  <p className="w-1/2">{title}</p>
                  <input
                    type="number"
                    className="input"
                    value={tempExchangeRates[id] ?? exchangeRate.toString()} // Показываем временное значение или число
                    onChange={(e) =>
                      handleExchangeRateChange(id, e.target.value)
                    }
                  />
                </div>
              ))}
          </div>
        </>
      )}

      <h3 className="mt-4"> {text.appData[userLanguage]}</h3>
      <div className="mt-1 grid grid-cols-2 gap-4">
        <button
          className="btn_2 border border-[#EA4335] text-[#EA4335]"
          onClick={() => setDeleteAllAlert(true)}
        >
          {text.deleteAll[userLanguage]}
        </button>
        <button className="btn_2" onClick={() => setPasswordModal(true)}>
          {text.sync[userLanguage]}
        </button>

        <ThemeToggle userLanguage={userLanguage} text={text} theme={theme} />

        <LanguageToogle />
      </div>
    </>
  );
}
