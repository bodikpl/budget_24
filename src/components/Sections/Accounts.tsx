import { useState } from "react";
import { accounts } from "../../../data";
import AccountCard from "../AccountCard";
import Modal from "../Modal";

function Accounts() {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && <Modal title="Счета" setModal={setModal} />}

      <section>
        <div className="flex justify-between items-end">
          <h3>Счета</h3>
          <button className="btn_1" onClick={() => setModal(true)}>
            +
          </button>
        </div>

        {accounts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2 items-center">
            {accounts.map((account) => (
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
