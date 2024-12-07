import { useState } from "react";

import { Account, Transaction } from "../../lib/types";
import Modal from "./Modal";
import AccountModalContent from "../ModalContents/AccountModalContent";
import { useLocalStorage } from "usehooks-ts";

type AccountCardProps = { account: Account };

export default function AccountCard({ account }: AccountCardProps) {
  const [modal, setModal] = useState(false);
  const [localIncomeTransactions] = useLocalStorage<Transaction[]>(
    "localIncomeTransactions",
    []
  );

  const getTotalAmountByAccountTitle = (
    transactions: Transaction[],
    accountTitle: string
  ): number => {
    return transactions
      .filter((transaction) => transaction.accountTitle === accountTitle)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const total = getTotalAmountByAccountTitle(
    localIncomeTransactions,
    account.title
  );

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
        className="rounded-lg p-2 w-full flex justify-between items-start text-xs text-white font-aptosSemiBold cursor-pointer"
      >
        <div>
          <p>
            {account.title}, <span>{account.currency}</span>
          </p>
          <p className="text-base font-aptosBold">
            {account.initialBalance + total}{" "}
            <span className="text-xs">{account.currency}</span>
          </p>
        </div>
      </div>
    </>
  );
}
