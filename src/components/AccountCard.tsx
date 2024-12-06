import { useState } from "react";
import { Account } from "../lib/types";
import Modal from "./Modal";
import AccountModalContent from "./ModalContents/AccountModalContent";

type AccountCardProps = { account: Account };

export default function AccountCard({ account }: AccountCardProps) {
  const [modal, setModal] = useState(false);

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
            {account.balance}{" "}
            <span className="text-xs">{account.currency}</span>
          </p>
        </div>
      </div>
    </>
  );
}
