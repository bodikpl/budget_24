import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from "../../lib/data";
import CategoriesSelect from "../Selects/CategoriesSelect";

type TransactionModalContentProps = {
  transactionType: "income" | "expense";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  editMode?: boolean;
  transaction?: Transaction;
};

export default function TransactionModalContent({
  transactionType,
  setModal,
  editMode,
  transaction,
}: TransactionModalContentProps) {
  const [accountSelectModal, setAccountSelectModal] = useState(false);
  const [categoriesSelectModal, setCategoriesSelectModal] = useState(false);

  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const transactionAccount = localAccounts.filter(
    (acc) => acc.id === transaction?.accountId
  )[0];

  const [selectedAccount, setSelectedAccount] = useState<null | Account>(
    editMode ? transactionAccount : null
  );
  const [selectedCategory, setSelectedCategory] = useState(
    transaction ? transaction.category : ""
  );
  const [description, setDescription] = useState(
    transaction ? transaction.description : ""
  );
  const [amount, setAmount] = useState(
    transaction
      ? transaction.transactionType === "income"
        ? transaction.amount
        : -1 * transaction.amount
      : ""
  );

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
        id: editMode && transaction ? transaction.id : uuidv4(),
        category: selectedCategory,
        accountId: selectedAccount.id,
        currency: selectedAccount.currency,
        description,
        amount:
          transactionType === "income" ? Number(amount) : -1 * Number(amount),
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

  const handleDeleteTransaction = (id: string) => {
    const filteredLocalTransactions = localTransactions.filter(
      (transaction) => transaction.id !== id
    );
    setLocalTransactions(filteredLocalTransactions);
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

      <button
        style={{
          backgroundColor: selectedAccount
            ? localAccounts.filter((acc) => acc.id === selectedAccount.id)[0]
                .color
            : "#F2F2F2",
          color: selectedAccount ? "white" : "black",
        }}
        className="btn_2"
        onClick={() => setAccountSelectModal(true)}
      >
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

      <h3 className="mt-4">Сумма</h3>
      <div className="flex gap-4 justify-between">
        <input
          type="number"
          value={amount}
          autoFocus
          placeholder="Введите сумму"
          className="btn_2 !w-1/2 text-center text-lg"
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-4 justify-end">
          {editMode && (
            <button
              className="bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden border border-[#EA4335] text-[#EA4335]"
              onClick={() => {
                setModal(false);
                transaction && handleDeleteTransaction(transaction.id);
              }}
              // disabled={!title || !selectedCurrency}
            >
              Удалить
            </button>
          )}
          <button
            className="bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
            onClick={() => {
              setModal(false);
              handleSaveTransaction();
            }}
            disabled={!selectedAccount || !selectedCategory || !amount}
          >
            {editMode ? "Изменить" : "Сохранить"}
          </button>
        </div>
      </div>
    </>
  );
}
