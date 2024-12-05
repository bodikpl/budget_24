import { useState } from "react";
import AccountCard from "../AccountCard";
import Modal from "../Modal";
import AddingAccountModalContent, {
  Account,
} from "../ModalContents/AddingAccountModalContent";
import { useLocalStorage } from "usehooks-ts";

function Accounts() {
  const [modal, setModal] = useState(false);
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  return (
    <>
      {modal && (
        <Modal
          title="Добавить счет"
          setModal={setModal}
          node={<AddingAccountModalContent setModal={setModal} />}
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
              <AccountCard
                key={account.id}
                title={account.title}
                currency={account.currency}
                color={account.color}
                balance={account.balance}
              />
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
