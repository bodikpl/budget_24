import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import { Account, Language, TextType, Transaction } from "../../lib/types";
import Modal from "../Widgets/Modal";
import AccountSelect from "../Selects/AccountSelect";
import Alert from "../Widgets/Alert";
import Calendar from "../Widgets/Calendar";
import { getFormattedDates } from "../../lib/fn";
import { CalendarIcon } from "../Widgets/Icons";

type TransactionModalContentProps = {
  userLanguage: Language;
  text: TextType;
  transactionType: "income" | "expense";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  transaction?: Transaction;
};

export default function TransactionModalContent({
  userLanguage,
  text,
  transactionType,
  setModal,
  transaction,
}: TransactionModalContentProps) {
  const [accountSelectModal, setAccountSelectModal] = useState(false);
  const [dateSelectModal, setDateSelectModal] = useState(false);

  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const transactionAccount = localAccounts.filter(
    (acc) => acc.id === transaction?.accountId
  )[0];

  const [selectedAccount, setSelectedAccount] = useState<null | Account>(
    transaction ? transactionAccount : null
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

  const [localTransactions, setLocalTransactions] = useLocalStorage<
    Transaction[]
  >("localTransactions", []);

  // Функция для сохранения или обновления транзакции
  const handleSaveTransaction = () => {
    if (selectedAccount) {
      const newTransaction: Transaction = {
        id: transaction ? transaction.id : uuidv4(),
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
  const formatedSelectedDay = getFormattedDates(selectedDate, userLanguage);

  return (
    <>
      {deleteAlert && (
        <Alert
          title={text.transactionDeletion[userLanguage]}
          dascription={text.confirmTransactionDeletion[userLanguage]}
          onClose={() => setDeleteAlert(false)}
          onConfirm={() => {
            setModal(false);
            transaction && handleDeleteTransaction(transaction.id);
          }}
        />
      )}
      {dateSelectModal && (
        <Modal
          title={text.selectDate[userLanguage]}
          setModal={setDateSelectModal}
          node={
            <Calendar
              userLanguage={userLanguage}
              text={text}
              selected={selectedDate}
              onDateSelect={setSelectedDate}
              setModal={setDateSelectModal}
            />
          }
        />
      )}
      {accountSelectModal && (
        <Modal
          title={text.accounts[userLanguage]}
          setModal={setAccountSelectModal}
          node={<AccountSelect setModal={handleAccountSelect} />}
        />
      )}

      <div className="flex gap-4">
        <input
          type="number"
          value={amount}
          autoFocus
          placeholder={text.amount[userLanguage]}
          className="input text-xl"
          onChange={(e) => setAmount(e.target.value)}
        />
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
            : text.selectAccount[userLanguage]}
        </button>
      </div>

      <input
        type="text"
        value={description}
        placeholder={text.description[userLanguage]}
        className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-300/10 dark:placeholder:text-neutral-200 w-full rounded-lg placeholder:text-neutral-500"
        onChange={(e) => setDescription(e.target.value)}
      />

      {transaction && (
        <button
          className="mt-4 btn_2 border border-[#EA4335] text-[#EA4335]"
          onClick={() => setDeleteAlert(true)}
          // disabled={!title || !selectedCurrency}
        >
          {text.delete[userLanguage]}
        </button>
      )}

      <div className="mt-4 flex gap-4 justify-end">
        <div className="flex gap-4 justify-end">
          <button
            className="btn_2 gap-4"
            onClick={() => setDateSelectModal(true)}
          >
            <CalendarIcon /> {formatedSelectedDay}
          </button>
          <button
            className="btn_2"
            onClick={() => {
              setModal(false);
              handleSaveTransaction();
            }}
            disabled={!selectedAccount || !amount}
          >
            {transaction ? text.edit[userLanguage] : text.save[userLanguage]}
          </button>
        </div>
      </div>
    </>
  );
}
