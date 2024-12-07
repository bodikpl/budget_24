import { useLocalStorage } from "usehooks-ts";
import { COLORS, CURRENCY } from "../../lib/data";
import { useState } from "react";
import { Account } from "../../lib/types";
import { v4 as uuidv4 } from "uuid";

type AddingAccountModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddingAccountModalContent({
  setModal,
}: AddingAccountModalContentProps) {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  const [localAccounts, setLocalAccounts] = useLocalStorage<Account[]>(
    "localAccounts",
    []
  );

  const [title, setTitle] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [initialBalance, setInitialBalance] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

  // Функция для сохранения или обновления аккаунта
  const handleSaveAccount = () => {
    const newAccount: Account = {
      id: uuidv4(),
      title,
      currency: selectedCurrency,
      color: selectedColor,
      initialBalance: Number(initialBalance),
    };

    // Проверяем, есть ли уже аккаунт с таким названием
    const existingAccountIndex = localAccounts.findIndex(
      (account) => account.title === title
    );

    if (existingAccountIndex > -1) {
      // Если аккаунт существует, обновляем его
      const updatedAccounts = [...localAccounts];
      updatedAccounts[existingAccountIndex] = newAccount;
      setLocalAccounts(updatedAccounts);
      setModal(false);
    } else {
      // Если аккаунта нет, добавляем новый
      setLocalAccounts([...localAccounts, newAccount]);
      setModal(false);
    }
  };

  return (
    <>
      {localMainCurrency ? (
        <>
          <h3>Название счета</h3>
          <input
            type="text"
            placeholder="Название банка, Наличные итд"
            className="w-full text-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <p className="mt-4">Валюта счета</p>
          <div className="mt-1 grid grid-cols-4 gap-4">
            {CURRENCY.map(({ id, title }) => (
              <button
                key={id}
                className={`${
                  selectedCurrency === title ? "ring-2 ring-neutral-500" : ""
                } btn_2`}
                onClick={() => setSelectedCurrency(title)}
              >
                {title}
              </button>
            ))}
          </div>

          <p className="mt-4">Начальный баланс</p>
          <input
            type="number"
            placeholder="Укажите, если нужно"
            className="w-full"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />

          <p className="mt-4">Цвет</p>
          <div className="mt-1 flex justify-between">
            {COLORS.map((el) => (
              <button
                key={el}
                style={{ backgroundColor: el }}
                className={`${
                  selectedColor === el ? "scale-[115%]" : ""
                } w-10 h-10 aspect-square px-4 rounded-full transition-all`}
                onClick={() => setSelectedColor(el)}
              ></button>
            ))}
          </div>

          <button
            className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
            onClick={handleSaveAccount}
            disabled={!title || !selectedCurrency}
          >
            Сохранить
          </button>
        </>
      ) : (
        "Сначала выберите основную валюту в настройках"
      )}
    </>
  );
}
