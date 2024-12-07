import { useState } from "react";

import { Account, Transaction } from "../../lib/types";
import Modal from "./Modal";
import AccountModalContent from "../ModalContents/AccountModalContent";
import { useLocalStorage } from "usehooks-ts";

type AccountCardProps = { account: Account };

export default function AccountCard({ account }: AccountCardProps) {
  const [modal, setModal] = useState(false);
  const [localTransactions] = useLocalStorage<Transaction[]>(
    "localTransactions",
    []
  );
  const [localExpensesTransactions] = useLocalStorage<Transaction[]>(
    "localExpensesTransactions",
    []
  );

  const transactions = [...localTransactions, ...localExpensesTransactions];

  const getTotalAmountByAccountTitle = (
    transactions: Transaction[],
    accountTitle: string
  ): number => {
    return transactions
      .filter((transaction) => transaction.accountTitle === accountTitle)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const total = getTotalAmountByAccountTitle(transactions, account.title);

  return (
    <>
      {modal && (
        <Modal
          title="Счет"
          setModal={setModal}
          node={<AccountModalContent account={account} setModal={setModal} />}
        />
      )}

      <div
        style={{ backgroundColor: account.color }}
        onClick={() => setModal(true)}
        className="rounded-lg p-2 w-full flex justify-between items-start text-white font-aptosSemiBold cursor-pointer"
      >
        <div>
          <p className="text-xs">
            {account.title}, <span>{account.currency}</span>
          </p>
          <p className="text-lg font-aptosBold">
            {account.initialBalance + total}{" "}
            <span className="text-xs">{account.currency}</span>
          </p>
        </div>
      </div>
    </>
  );
}
