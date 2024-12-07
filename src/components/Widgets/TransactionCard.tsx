import { useState } from "react";
import Modal from "./Modal";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { Account, Transaction } from "../../lib/types";
import { getFormattedDate } from "../../lib/fn";
import { useLocalStorage } from "usehooks-ts";

type TransactionCardProps = { transaction: Transaction };

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const [transactionModal, setTransactionModal] = useState(false);

  const formattedDate = getFormattedDate(transaction.date);

  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const transactionAccount = localAccounts.filter(
    (acc) => acc.id === transaction?.accountId
  )[0];

  return (
    <>
      {transactionModal && (
        <Modal
          title="Транзакция"
          setModal={setTransactionModal}
          node={
            <TransactionModalContent
              transactionType={transaction.transactionType}
              transaction={transaction}
              setModal={setTransactionModal}
              editMode={true}
            />
          }
        />
      )}

      <div
        onClick={() => setTransactionModal(true)}
        className="flex items-center p-3 h-[68px] overflow-hidden border-b border-neutral-200 last:border-none cursor-pointer"
      >
        <div
          className={`${
            transaction.transactionType === "income"
              ? "bg-[#dcfce7]"
              : "bg-[#fee2e2]"
          } aspect-square w-10 h-10 rounded-full text-3xl leading-none flex justify-center items-center `}
        >
          +
        </div>

        <div className="w-full ml-4 flex flex-col justify-center">
          <div className="flex gap-4 justify-between items-center">
            <p>
              {transaction.category}, {formattedDate}
            </p>
            <p
              className={`whitespace-nowrap text-right ${
                transaction.amount > 0 ? "text-[#34A853]" : "text-[#EA4335]"
              }  text-xl font-aptosBold`}
            >
              {transaction.amount}{" "}
              <span className="text-xs">{transaction.currency}</span>
            </p>
          </div>
          <div className="flex gap-4 justify-between text-xs text-neutral-500">
            <p>{transaction.description}</p>
            <p className="whitespace-nowrap font-aptosSemiBold">
              {transactionAccount.title}, {transaction.currency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
