import { useState } from "react";
import { CURRENCY } from "../../../data";
import { useLocalStorage } from "usehooks-ts";

type HeadModalProps = {};
type CurrencyProps = { id: string; title: string; exchangeRate: number };

export default function HeadModal({}: HeadModalProps) {
  const [localMainCurrency, setLocalMainCurrency] = useLocalStorage(
    "localMainCurrency",
    ""
  );
  const [localCurrency, setLocalCurrency] = useLocalStorage<CurrencyProps[]>(
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
    <div>
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
                    className="w-20"
                    value={exchangeRate || ""}
                    onChange={(e) =>
                      handleExchangeRateChange(id, parseFloat(e.target.value))
                    }
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
