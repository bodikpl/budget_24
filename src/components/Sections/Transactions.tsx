import { useState } from "react";
import Modal from "../Widgets/Modal";
import TransactionCard from "../Widgets/TransactionCard";
import { Transaction } from "../../lib/types";
import { FilterIcon } from "../Widgets/Icons";
import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";

type TransactionsProps = { transactions: Transaction[] };

export default function Transactions({ transactions }: TransactionsProps) {
  const [filterModal, setFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"mounth" | "day" | "year">(
    "mounth"
  );

  const [filter, setFilter] = useState<"day" | "month" | "year" | "all">("all");
  const [type, setType] = useState<"all" | "expense" | "income">("all");

  const today = new Date();

  // Фильтрация по дате
  const filteredByDate = transactions.filter((transaction) => {
    if (filter === "day") {
      return isSameDay(transaction.date, today);
    }
    if (filter === "month") {
      return isSameMonth(transaction.date, today);
    }
    if (filter === "year") {
      return isSameYear(transaction.date, today);
    }
    return true; // Если "all", возвращаем все
  });

  // Фильтрация по типу транзакции
  const filteredByType = filteredByDate.filter((transaction) => {
    if (type === "expense") {
      return transaction.transactionType === "expense";
    }
    if (type === "income") {
      return transaction.transactionType === "income";
    }
    return true; // Если "all", возвращаем все
  });

  return (
    <>
      {filterModal && (
        <Modal
          title="Фильтр"
          setModal={setFilterModal}
          node={
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setActiveTab("day");
                  }}
                  className={`${
                    activeTab === "day" && "bg-neutral-100 text-neutral-800"
                  } w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all`}
                >
                  Сегодня
                </button>
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setActiveTab("mounth");
                  }}
                  className={`${
                    activeTab === "mounth" && "bg-neutral-100 text-neutral-800"
                  } w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all`}
                >
                  За месяц
                </button>
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setActiveTab("year");
                  }}
                  className={`${
                    activeTab === "year" && "bg-neutral-100 text-neutral-800"
                  } w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all`}
                >
                  За год
                </button>
              </div>

              {/* Фильтр по типу транзакции */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setType("all");
                  }}
                  className={`btn_2 ${
                    type === "all" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setType("expense");
                  }}
                  className={`btn_2 ${
                    type === "expense" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  Расходы
                </button>
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setType("income");
                  }}
                  className={`btn_2 ${
                    type === "income" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  Доходы
                </button>
              </div>
            </>
          }
        />
      )}

      <section className="w-full">
        <div className="flex justify-between items-start">
          <h3>Транзакции</h3>

          <div className="flex gap-4">
            <button onClick={() => setFilterModal(true)}>
              <FilterIcon />
            </button>
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className="mt-2 bg-white shadow-lg rounded-lg max-h-[680px] overflow-y-auto">
            {filteredByType.map((transaction) => (
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
