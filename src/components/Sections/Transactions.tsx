import { useState } from "react";
import Modal from "../Widgets/Modal";
import { transactions } from "../../lib/data";
import TransactionCard from "../Widgets/TransactionCard";

function Transactions() {
  const [modal, setModal] = useState(false);
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
              <TransactionCard
                key={transaction.id}
                category={transaction.category}
                accountTitle={transaction.accountTitle}
                amount={transaction.amount}
                currency={transaction.currency}
                date={transaction.date}
                description={transaction.description}
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
export default Transactions;
