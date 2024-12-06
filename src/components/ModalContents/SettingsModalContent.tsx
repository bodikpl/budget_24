import { useState } from "react";
import { CURRENCY } from "../../../data";
import { useLocalStorage } from "usehooks-ts";
import { Currency } from "../../lib/types";

type SettingsModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsModalContent({
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

  const handleExchangeRateChange = (id: string, newRate: number) => {
    setLocalCurrency((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, exchangeRate: newRate } : item
      )
    );
  };

  return (
    <>
      <h3>
        {mainCurrency
          ? `Основная валюта ${mainCurrency}`
          : "Выберите основную валюту"}
      </h3>

      <div className="mt-1 grid grid-cols-4 gap-4">
        {CURRENCY.map(({ id, title }) => (
          <button
            key={id}
            className={`${
              mainCurrency === title ? "ring-2 ring-neutral-500" : ""
            } btn_2`}
            onClick={() => handleCurrencySelection(title)}
          >
            {title}
          </button>
        ))}
      </div>

      {mainCurrency && (
        <>
          <p className="mt-4 font-aptosSemiBold">Актуальный курс</p>
          <div className="mt-1 grid grid-cols-3 gap-4">
            {localCurrency
              .filter((currency) => currency.title !== mainCurrency)
              .map(({ id, title, exchangeRate }) => (
                <div key={id} className="flex items-center gap-4">
                  <p>{title}</p>
                  <input
                    type="number"
                    className="w-full"
                    value={exchangeRate || ""}
                    onChange={(e) =>
                      handleExchangeRateChange(id, parseFloat(e.target.value))
                    }
                  />
                </div>
              ))}
          </div>
          <button
            className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
            onClick={() => setModal(false)}
            disabled={!mainCurrency}
          >
            Сохранить
          </button>
        </>
      )}
    </>
  );
}
