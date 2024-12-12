import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "./Modal";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { Account, Language, TextType, Transaction } from "../../lib/types";
import { getFormattedDates } from "../../lib/fn";
import { ExpenseIcon, IncomeIcon } from "./Icons";

type TransactionCardProps = {
  userLanguage: Language;
  text: TextType;
  transaction: Transaction;
};

export default function TransactionCard({
  userLanguage,
  text,
  transaction,
}: TransactionCardProps) {
  const [transactionModal, setTransactionModal] = useState(false);

  const formattedDate = getFormattedDates(transaction.date, userLanguage);
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const transactionAccount = localAccounts.find(
    (acc) => acc.id === transaction.accountId
  );

  const transactionTypeClass =
    transaction.transactionType === "income"
      ? "bg-[#dcfce7] dark:bg-[#34A853]"
      : "bg-[#fee2e2] dark:bg-[#EA4335]";
  const amountClass =
    transaction.amount > 0 ? "text-[#34A853]" : "text-[#EA4335]";

  return (
    <>
      {transactionModal && (
        <Modal
          title="Транзакция"
          setModal={setTransactionModal}
          node={
            <TransactionModalContent
              userLanguage={userLanguage}
              text={text}
              transactionType={transaction.transactionType}
              transaction={transaction}
              setModal={setTransactionModal}
              editMode
            />
          }
        />
      )}

      <div
        onClick={() => setTransactionModal(true)}
        className="flex items-center p-3 overflow-hidden border-b border-neutral-200 dark:border-black last:border-none cursor-pointer"
      >
        <div
          className={`${transactionTypeClass} aspect-square w-10 h-10 rounded-full text-3xl flex justify-center items-center`}
        >
          {transaction.transactionType === "income" ? (
            <IncomeIcon />
          ) : (
            <ExpenseIcon />
          )}
        </div>

        <div className="w-full ml-4 flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <p>
              {transaction.description
                ? `${transaction.description}, ${formattedDate.toLowerCase()}`
                : formattedDate}
            </p>
            <p
              className={`whitespace-nowrap text-xl font-aptosBold ${amountClass}`}
            >
              {transaction.amount}{" "}
              <span className="text-xs">{transaction.currency}</span>
            </p>
          </div>

          <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <p>{transaction.category}</p>
            {transactionAccount && (
              <p
                style={{ backgroundColor: transactionAccount.color }}
                className="whitespace-nowrap text-white dark:text-neutral-100 px-1.5 rounded-md"
              >
                {transactionAccount.title}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
