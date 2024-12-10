import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import AccountModalContent from "../ModalContents/AccountModalContent";
import Modal from "../Widgets/Modal";
import AccountCard from "../Widgets/AccountCard";
import { Account, Language, TextType } from "../../lib/types";

type AccountsProps = { userLanguage: Language; text: TextType };

export default function Accounts({ userLanguage, text }: AccountsProps) {
  const [modal, setModal] = useState(false);
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  return (
    <>
      {modal && (
        <Modal
          title={text.addAccount[userLanguage]}
          setModal={setModal}
          node={<AccountModalContent setModal={setModal} />}
        />
      )}

      <section>
        <div className="flex justify-between items-end">
          <h3>{text.accounts[userLanguage]}</h3>
          <button className="btn_1" onClick={() => setModal(true)}>
            +
          </button>
        </div>

        {localAccounts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2 items-center">
            {localAccounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">
            {text.addFirstAccount[userLanguage]}
          </p>
        )}
      </section>
    </>
  );
}
