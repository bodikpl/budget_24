import { useState } from "react";
import {
  CURRENCY,
  EXPENSES_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../lib/data";
import { useLocalStorage } from "usehooks-ts";
import { Currency } from "../../lib/types";
import Modal from "../Widgets/Modal";
import CategoriesSelect from "../Selects/CategoriesSelect";
import Alert from "../Widgets/Alert";

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

  const [incomeCategoriesModal, setIncomeCategoriesModal] = useState(false);
  const [expenseCategoriesModal, setExpensesCategoriesModal] = useState(false);

  const [deleteAllAlert, setDeleteAllAlert] = useState(false);
  const [changeCurrencyAlert, setChangeCurrencyAlert] = useState(false);

  const [currencyForSelect, setCurrencyForSalect] = useState("");

  return (
    <>
      {deleteAllAlert && (
        <Alert
          title="Удалить всё"
          dascription="Вы действительно хотите удалить всё?"
          onClose={() => setDeleteAllAlert(false)}
          onConfirm={() => {
            localStorage.clear();
            location.reload();
          }}
        />
      )}
      {changeCurrencyAlert && (
        <Alert
          title="Изменение основной валюты"
          dascription="Вы действительно хотите изменить основную валюту? Курсы оставшихся валют нужно будет настроить заново!"
          onClose={() => setChangeCurrencyAlert(false)}
          onConfirm={() => {
            handleCurrencySelection(currencyForSelect);
            setChangeCurrencyAlert(false);
          }}
        />
      )}

      {incomeCategoriesModal && (
        <Modal
          title="Категории доходов"
          setModal={setIncomeCategoriesModal}
          node={
            <CategoriesSelect
              categories={INCOME_CATEGORIES}
              onClose={setIncomeCategoriesModal}
            />
          }
          subModal={true}
        />
      )}
      {expenseCategoriesModal && (
        <Modal
          title="Категории расходов"
          setModal={setExpensesCategoriesModal}
          node={
            <CategoriesSelect
              categories={EXPENSES_CATEGORIES}
              onClose={setExpensesCategoriesModal}
            />
          }
          subModal={true}
        />
      )}

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
          <p className="mt-4 font-aptosSemiBold">Актуальный курс</p>
          <div className="mt-1 grid grid-cols-3 gap-4">
            {localCurrency
              .filter((currency) => currency.title !== mainCurrency)
              .map(({ id, title, exchangeRate }) => (
                <div key={id} className="flex items-center">
                  <p className="w-1/2">{title}</p>
                  <input
                    type="number"
                    className="w-full py-1 bg-neutral-100 rounded-lg text-center"
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

      <h3 className="mt-4">Категории</h3>
      <div className="mt-1 grid grid-cols-2 gap-4">
        <button
          className="btn_2"
          onClick={() => setIncomeCategoriesModal(true)}
        >
          Доходы
        </button>
        <button
          className="btn_2"
          onClick={() => setExpensesCategoriesModal(true)}
        >
          Расходы
        </button>
      </div>

      <h3 className="mt-4">Данные приложения</h3>
      <div className="mt-1 grid grid-cols-2 gap-4">
        <button
          className="btn_2 border border-[#EA4335] text-[#EA4335]"
          onClick={() => setDeleteAllAlert(true)}
        >
          Удалить все
        </button>
        <button
          className="btn_2"
          // onClick={() => setExpensesCategoriesModal(true)}
        >
          Синхронизация
        </button>
      </div>

      {mainCurrency && (
        <button
          className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
          onClick={() => setModal(false)}
          disabled={!mainCurrency}
        >
          Сохранить
        </button>
      )}
    </>
  );
}
