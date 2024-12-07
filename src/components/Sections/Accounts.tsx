import { useState } from "react";
import Modal from "../Widgets/Modal";
import AccountModalContent from "../ModalContents/AccountModalContent";
import { useLocalStorage } from "usehooks-ts";
import { Account } from "../../lib/types";
import AccountCard from "../Widgets/AccountCard";

function Accounts() {
  const [modal, setModal] = useState(false);
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  return (
    <>
      {modal && (
        <Modal
          title="Добавить счет"
          setModal={setModal}
          node={<AccountModalContent setModal={setModal} />}
        />
      )}

      <section>
        <div className="flex justify-between items-end">
          <h3>Счета</h3>
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
          <p className="text-neutral-500">Добавьте первый счет</p>
        )}
      </section>
    </>
  );
}
export default Accounts;
