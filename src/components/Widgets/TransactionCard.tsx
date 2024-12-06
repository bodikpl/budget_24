import { useState } from "react";
import Modal from "./Modal";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { Transacion } from "../../lib/types";

type TransactionCardProps = { transaction: Transacion };

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const [transactionModal, setTransactionModal] = useState(false);
  return (
    <>
      {transactionModal && (
        <Modal
          title="Транзакция"
          setModal={setTransactionModal}
          node={<TransactionModalContent transaction={transaction} />}
        />
      )}

      <div
        onClick={() => setTransactionModal(true)}
        className="flex items-center p-3 overflow-hidden border-b border-neutral-200 last:border-none cursor-pointer"
      >
        <div className="aspect-square w-10 h-10 rounded-full text-3xl leading-none flex justify-center items-center bg-yellow-100">
          +
        </div>

        <div className="w-full ml-4 flex flex-col justify-center">
          <div className="flex gap-4 justify-between items-center">
            <p>
              {transaction.date} - {transaction.category}
            </p>
            <p className="whitespace-nowrap text-right text-[#EA4335] text-xl font-aptosBold">
              {transaction.amount}{" "}
              <span className="text-xs">{transaction.currency}</span>
            </p>
          </div>
          <div className="flex gap-4 justify-between text-xs text-neutral-500">
            <p>{transaction.description}</p>
            <p className="whitespace-nowrap font-aptosSemiBold">
              {transaction.accountTitle}, {transaction.currency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}