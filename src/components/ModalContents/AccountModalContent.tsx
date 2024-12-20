import { useLocalStorage } from "usehooks-ts";
import { COLORS, CURRENCY } from "../../lib/data";
import { useState } from "react";
import { Account } from "../../lib/types";
import { v4 as uuidv4 } from "uuid";
import Alert from "../Widgets/Alert";
import { useCurrentLanguage } from "../../lib/LangContext";
import { text } from "../../lib/lang";

type AccountModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  editMode?: boolean;
  account?: Account;
};

export default function AccountModalContent({
  setModal,
  editMode,
  account,
}: AccountModalContentProps) {
  const { userLanguage } = useCurrentLanguage();
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  const [localAccounts, setLocalAccounts] = useLocalStorage<Account[]>(
    "localAccounts",
    []
  );

  const [title, setTitle] = useState<string>(account ? account.title : "");
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    account ? account.currency : ""
  );
  const [initialBalance, setInitialBalance] = useState(
    account ? account.initialBalance : ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    account ? account.color : COLORS[0]
  );

  // Функция для сохранения или обновления аккаунта
  const handleSaveAccount = () => {
    const newAccount: Account = {
      id: editMode && account ? account.id : uuidv4(),
      title,
      currency: selectedCurrency,
      color: selectedColor,
      initialBalance: Number(initialBalance),
    };

    // Проверяем, есть ли уже аккаунт с таким названием
    const existingAccountIndex = localAccounts.findIndex(
      (acc) => acc.id === newAccount.id
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

  const handleDeleteAccount = (id: string) => {
    const filteredLocalAccounts = localAccounts.filter((acc) => acc.id !== id);
    setLocalAccounts(filteredLocalAccounts);
  };

  const [deleteAlert, setDeleteAlert] = useState(false);

  return (
    <>
      {localMainCurrency ? (
        <>
          {deleteAlert && (
            <Alert
              title={text.accountDeletion[userLanguage]}
              dascription={text.confirmAccountDeletion[userLanguage]}
              onClose={() => setDeleteAlert(false)}
              onConfirm={() => {
                setModal(false);
                account && handleDeleteAccount(account.id);
              }}
            />
          )}

          <div className="flex gap-2 items-end">
            <div className="w-3/4">
              <h3>{text.accountName[userLanguage]}</h3>
              <input
                type="text"
                placeholder={text.name[userLanguage]}
                className="input text-lg mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <p>{text.initialBalance[userLanguage]}</p>
              <input
                type="number"
                placeholder={text.amount[userLanguage]}
                className="input text-lg mt-1"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
              />
            </div>
          </div>

          <p className="mt-4">{text.accountCurrency[userLanguage]}</p>
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

          <p className="mt-4">{text.color[userLanguage]}</p>
          <div className="mt-1 flex justify-between">
            {COLORS.map((el) => (
              <button
                key={el}
                style={{ backgroundColor: el }}
                className={`${
                  selectedColor === el ? "scale-[119%]" : ""
                } w-10 h-10 aspect-square px-4 rounded-full transition-all`}
                onClick={() => setSelectedColor(el)}
              ></button>
            ))}
          </div>

          <div className="mt-6 flex gap-4 justify-end">
            {editMode && (
              <button
                className="btn_2 border border-[#EA4335] text-[#EA4335]"
                onClick={() => setDeleteAlert(true)}
                disabled={!title || !selectedCurrency}
              >
                {text.delete[userLanguage]}
              </button>
            )}
            <button
              className="btn_2"
              onClick={handleSaveAccount}
              disabled={!title || !selectedCurrency}
            >
              {editMode ? text.edit[userLanguage] : text.save[userLanguage]}
            </button>
          </div>
        </>
      ) : (
        `${text.selectPrimaryCurrency[userLanguage]}`
      )}
    </>
  );
}
