import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "./Modal";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { Account, Language, TextType, Transaction } from "../../lib/types";
import { getFormattedDates } from "../../lib/fn";

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
            />
          }
        />
      )}

      <div
        onClick={() => setTransactionModal(true)}
        className="flex items-center p-3 overflow-hidden border-b border-neutral-200 dark:border-black last:border-none cursor-pointer"
      >
        <div className="w-full flex justify-between items-center">
          <div>
            {transaction.description
              ? `${transaction.description}, ${formattedDate.toLowerCase()}`
              : formattedDate}
            {transactionAccount && (
              <p
                style={{ backgroundColor: transactionAccount.color }}
                className="mt-1 w-fit text-xs whitespace-nowrap text-white dark:text-neutral-100 px-1.5 rounded-md"
              >
                {transactionAccount.title}
              </p>
            )}
          </div>

          <p
            className={`whitespace-nowrap text-xl font-aptosBold ${amountClass}`}
          >
            {transaction.amount}{" "}
            <span className="text-xs">{transaction.currency}</span>
          </p>
        </div>
      </div>
    </>
  );
}
