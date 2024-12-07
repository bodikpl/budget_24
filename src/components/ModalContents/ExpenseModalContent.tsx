import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";

import { EXPENSES_CATEGORIES } from "../../lib/data";
import CategoriesSelect from "../Selects/CategoriesSelect";

type ExpenseModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ExpenseModalContent({
  setModal,
}: ExpenseModalContentProps) {
  const [accountSelectModal, setAccountSelectModal] = useState(false);
  const [expensesCategoriesSelectModal, setExpensesCategoriesSelectModal] =
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
    setExpensesCategoriesSelectModal(false);
  };

  const [localExpensesTransactions, setLocalExpensesTransactions] =
    useLocalStorage<Transaction[]>("localExpensesTransactions", []);

  // Функция для сохранения или обновления транзакции
  const handleSaveTransaction = () => {
    if (selectedAccount && selectedCategory) {
      const newTransaction: Transaction = {
        id: uuidv4(),
        category: selectedCategory,
        accountTitle: selectedAccount.title,
        currency: selectedAccount.currency,
        description,
        amount: -1 * Number(amount),
        date: Date.now(),
      };

      const existingTransactionIndex = localExpensesTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      if (existingTransactionIndex > -1) {
        // Если транзакция существует, обновляем ее
        const updatedTransactions = [...localExpensesTransactions];
        updatedTransactions[existingTransactionIndex] = newTransaction;
        setLocalExpensesTransactions(updatedTransactions);
        setModal(false);
      } else {
        // Если транзакциии нет, добавляем новую
        setLocalExpensesTransactions([
          ...localExpensesTransactions,
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
      {expensesCategoriesSelectModal && (
        <Modal
          title="Категории расходов"
          setModal={setExpensesCategoriesSelectModal}
          node={
            <CategoriesSelect
              categories={EXPENSES_CATEGORIES}
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
        onClick={() => setExpensesCategoriesSelectModal(true)}
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
