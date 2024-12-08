import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from "../../lib/data";
import CategoriesSelect from "../Selects/CategoriesSelect";
import Alert from "../Widgets/Alert";
import Calendar from "../Widgets/Calendar";
import { getFormattedDates } from "../../lib/fn";

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
  const [dateSelectModal, setDateSelectModal] = useState(false);

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
  const [selectedDate, setSelectedDate] = useState(
    transaction ? transaction.date : new Date()
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
        date: selectedDate,
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

  const [deleteAlert, setDeleteAlert] = useState(false);
  const formatedSelectedDay = getFormattedDates(selectedDate);

  return (
    <>
      {deleteAlert && (
        <Alert
          title="Удаление транзакции"
          dascription="Вы действительно хотите удалить транзакцию?"
          onClose={() => setDeleteAlert(false)}
          onConfirm={() => {
            setModal(false);
            transaction && handleDeleteTransaction(transaction.id);
          }}
        />
      )}
      {dateSelectModal && (
        <Modal
          title="Счета"
          setModal={setDateSelectModal}
          node={
            <Calendar
              selected={selectedDate}
              onDateSelect={setSelectedDate}
              setModal={setDateSelectModal}
            />
          }
        />
      )}
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

      <div className="flex gap-4">
        <button
          style={{
            backgroundColor: selectedAccount
              ? localAccounts.filter((acc) => acc.id === selectedAccount.id)[0]
                  .color
              : "#F2F2F2",
            color: selectedAccount ? "white" : "black",
          }}
          className="btn_2 !w-2/3"
          onClick={() => setAccountSelectModal(true)}
        >
          {selectedAccount
            ? `${selectedAccount.title}, ${selectedAccount.currency}`
            : "Выберите счет"}
        </button>

        <input
          type="number"
          value={amount}
          autoFocus
          placeholder="Сумма"
          className="input text-lg !w-1/3"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mt-4 flex gap-4">
        <div className="w-full">
          <button
            className="btn_2"
            onClick={() => setCategoriesSelectModal(true)}
          >
            {selectedCategory ? selectedCategory : "Категория"}
          </button>
        </div>

        <button className="btn_2" onClick={() => setDateSelectModal(true)}>
          {formatedSelectedDay}
        </button>
      </div>

      <input
        type="text"
        value={description}
        placeholder="Описание (опционально)"
        className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-300/10 dark:placeholder:text-neutral-200 w-full rounded-lg placeholder:text-neutral-500"
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="mt-4 flex gap-4 justify-end">
        <div className="flex gap-4 justify-end">
          {editMode && (
            <button
              className="btn_2 border border-[#EA4335] text-[#EA4335]"
              onClick={() => setDeleteAlert(true)}
              // disabled={!title || !selectedCurrency}
            >
              Удалить
            </button>
          )}
          <button
            className="btn_2"
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
