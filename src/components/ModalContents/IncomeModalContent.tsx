import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";
import { INCOME_CATEGORIES } from "../../lib/data";
import CategoriesSelect from "../Selects/CategoriesSelect";

type IncomeModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function IncomeModalContent({
  setModal,
}: IncomeModalContentProps) {
  const [accountSelectModal, setAccountSelectModal] = useState(false);
  const [incomeCategoriesSelectModal, setIncomeCategoriesSelectModal] =
    useState(false);

  const [selectedAccount, setSelectedAccount] = useState<null | Account>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleIncomeAccountSelect = (value: Account) => {
    setSelectedAccount(value);
    setAccountSelectModal(false);
  };

  const handleIncomeCategoriesSelect = (value: string) => {
    setSelectedCategory(value);
    setIncomeCategoriesSelectModal(false);
  };

  const [localIncomeTransactions, setLocalIncomeTransactions] = useLocalStorage<
    Transaction[]
  >("localIncomeTransactions", []);

  // Функция для сохранения или обновления транзакции
  const handleSaveTransaction = () => {
    if (selectedAccount && selectedCategory) {
      const newTransaction: Transaction = {
        id: uuidv4(),
        category: selectedCategory,
        accountTitle: selectedAccount.title,
        currency: selectedAccount.currency,
        description,
        amount: Number(amount),
        date: Date.now(),
      };

      const existingTransactionIndex = localIncomeTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      if (existingTransactionIndex > -1) {
        // Если транзакция существует, обновляем ее
        const updatedTransactions = [...localIncomeTransactions];
        updatedTransactions[existingTransactionIndex] = newTransaction;
        setLocalIncomeTransactions(updatedTransactions);
        setModal(false);
      } else {
        // Если транзакциии нет, добавляем новую
        setLocalIncomeTransactions([
          ...localIncomeTransactions,
          newTransaction,
        ]);
        setModal(false);
      }
    }
  };

  return (
    <>
      {accountSelectModal && (
        <Modal
          title="Счета"
          setModal={setAccountSelectModal}
          node={<AccountSelect setModal={handleIncomeAccountSelect} />}
        />
      )}
      {incomeCategoriesSelectModal && (
        <Modal
          title="Категории доходов"
          setModal={setIncomeCategoriesSelectModal}
          node={
            <CategoriesSelect
              categories={INCOME_CATEGORIES}
              setModal={handleIncomeCategoriesSelect}
            />
          }
        />
      )}

      <p>Счет</p>
      <button className="btn_2" onClick={() => setAccountSelectModal(true)}>
        {selectedAccount
          ? `${selectedAccount.title}, ${selectedAccount.currency}`
          : "Выберите счет"}
      </button>

      <p className="mt-2">Категория</p>
      <button
        className="btn_2"
        onClick={() => setIncomeCategoriesSelectModal(true)}
      >
        {selectedCategory ? selectedCategory : "Выберите категорию"}
      </button>

      <p className="mt-2">Описание</p>
      <input
        type="text"
        value={description}
        placeholder="Опционально"
        className="btn_2"
        onChange={(e) => setDescription(e.target.value)}
      />

      <p className="mt-2">Сумма</p>
      <input
        type="number"
        value={amount}
        autoFocus
        placeholder="Введите сумму"
        className="btn_2"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => {
          setModal(false);
          handleSaveTransaction();
        }}
        disabled={!selectedAccount || !selectedCategory || !amount}
      >
        Сохранить
      </button>
    </>
  );
}
