import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from "../../lib/data";
import CategoriesSelect from "../Selects/CategoriesSelect";

type AddingTransactionModalContentProps = {
  transactionType: "income" | "expense";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddingTransactionModalContent({
  transactionType,
  setModal,
}: AddingTransactionModalContentProps) {
  const [accountSelectModal, setAccountSelectModal] = useState(false);
  const [categoriesSelectModal, setCategoriesSelectModal] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<null | Account>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAccountSelect = (value: Account) => {
    setSelectedAccount(value);
    setAccountSelectModal(false);
  };

  const handleCategoriesSelect = (value: string) => {
    setSelectedCategory(value);
    setCategoriesSelectModal(false);
  };

  const [localTransactions, setLocalTransactions] = useLocalStorage<
    Transaction[]
  >("localTransactions", []);

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
        transactionType,
        date: Date.now(),
      };

      const existingTransactionIndex = localTransactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );

      if (existingTransactionIndex > -1) {
        // Если транзакция существует, обновляем ее
        const updatedTransactions = [...localTransactions];
        updatedTransactions[existingTransactionIndex] = newTransaction;
        setLocalTransactions(updatedTransactions);
        setModal(false);
      } else {
        // Если транзакциии нет, добавляем новую
        setLocalTransactions([...localTransactions, newTransaction]);
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
          node={<AccountSelect setModal={handleAccountSelect} />}
        />
      )}
      {categoriesSelectModal && (
        <Modal
          title={`Категории ${
            transactionType === "income" ? "доходов" : "расходов"
          }`}
          setModal={setCategoriesSelectModal}
          node={
            <CategoriesSelect
              categories={
                transactionType === "income"
                  ? INCOME_CATEGORIES
                  : EXPENSES_CATEGORIES
              }
              setModal={handleCategoriesSelect}
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
      <button className="btn_2" onClick={() => setCategoriesSelectModal(true)}>
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
