import { useState } from "react";
import Modal from "../Widgets/Modal";
import TransactionCard from "../Widgets/TransactionCard";
import { useLocalStorage } from "usehooks-ts";
import { Transacion } from "../../lib/types";

function Transactions() {
  const [modal, setModal] = useState(false);
  const [localIncomeTransacions] = useLocalStorage<Transacion[]>(
    "localIncomeTransacions",
    []
  );
  const transactions = [...localIncomeTransacions];
  return (
    <>
      {modal && <Modal title="Счета" setModal={setModal} />}

      <section className="w-full">
        <div className="flex justify-between items-center">
          <h3>Транзакции</h3>
          <button>Показать все</button>
        </div>
        {transactions.length > 0 ? (
          <div className="mt-2 bg-white shadow-lg rounded-lg">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">Добавьте первый счет</p>
        )}
      </section>
    </>
  );
}
export default Transactions;
