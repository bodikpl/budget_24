import { useState } from "react";
import { CURRENCY } from "../../../data";
import { useLocalStorage } from "usehooks-ts";

type HeadModalProps = {};

export default function HeadModal({}: HeadModalProps) {
  const [localMainCurrency, setLocalMainCurrency] = useLocalStorage(
    "localMainCurrency",
    ""
  );
  // const [localExchangeRate, setLocalExchangeRate] = useLocalStorage(
  //   "localExchangeRate",
  //   []
  // );

  const [mainCurrency, setMainCurrency] = useState(localMainCurrency || "");

  return (
    <div>
      <h3>
        {mainCurrency
          ? `Основная валюта ${mainCurrency}`
          : "Выберите основную валюту"}
      </h3>

      <div className="mt-1 grid grid-cols-4 gap-4">
        {CURRENCY.map((item) => (
          <button
            key={item.id}
            className={`${
              mainCurrency === item.title ? "ring-2 ring-neutral-500" : ""
            } btn_2`}
            onClick={() => {
              setMainCurrency(item.title);
              setLocalMainCurrency(item.title);
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      {mainCurrency && (
        <>
          <p className="mt-4 font-aptosSemiBold text-neutral-500">
            Актуальный курс
          </p>

          {CURRENCY.filter((item) => item.title !== mainCurrency).map((el) => (
            <div key={el.id} className="flex gap-4">
              <p>{el.title}</p>
              <input type="number" className="w-20" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
