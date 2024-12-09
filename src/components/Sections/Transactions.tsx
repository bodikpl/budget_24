import { useState } from "react";
import Modal from "../Widgets/Modal";
import TransactionCard from "../Widgets/TransactionCard";
import { Transaction } from "../../lib/types";
import {
  FilterIcon,
  SortByDate,
  SortDownIcon,
  SortUpIcon,
} from "../Widgets/Icons";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";

type TransactionsProps = { transactions: Transaction[] };

export default function Transactions({ transactions }: TransactionsProps) {
  const [filterModal, setFilterModal] = useState(false);

  const [filter, setFilter] = useState<"day" | "month" | "year" | "all">(
    "month"
  );
  const [type, setType] = useState<"all" | "expense" | "income">("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

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

    return true;
  });

  // Фильтрация по типу транзакции
  const filteredByType = filteredByDate.filter((transaction) => {
    if (type === "expense") {
      return transaction.transactionType === "expense";
    }
    if (type === "income") {
      return transaction.transactionType === "income";
    }
    return true;
  });

  // Сортировка
  const sortedTransactions = [...filteredByType].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.amount - b.amount; // Сортировка по возрастанию
    }
    if (sortOrder === "desc") {
      return b.amount - a.amount; // Сортировка по убыванию
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Исходная сортировка по дате
  });

  // Функция для переключения сортировки
  const toggleSortOrder = () => {
    if (sortOrder === "none") {
      setSortOrder("desc"); // Переключаем на убывание
    } else if (sortOrder === "desc") {
      setSortOrder("asc"); // Переключаем на возрастание
    } else {
      setSortOrder("none"); // Сбрасываем к сортировке по дате
    }
  };

  return (
    <>
      {filterModal && (
        <Modal
          title="Фильтр"
          setModal={setFilterModal}
          node={
            <>
              <p>По дате</p>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`btn_2 ${
                    filter === "all" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => setFilter("day")}
                  className={`btn_2 ${
                    filter === "day" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  Сегодня
                </button>
                <button
                  onClick={() => setFilter("month")}
                  className={`btn_2 ${
                    filter === "month" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  Месяц
                </button>
                <button
                  onClick={() => setFilter("year")}
                  className={`btn_2 ${
                    filter === "year" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  Год
                </button>
              </div>

              <p className="mt-4">По типу транзакции</p>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => {
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
        <div className="flex justify-between items-center">
          <h3>Транзакции</h3>

          <div className="flex gap-4">
            <button
              className="btn_1 flex justify-center items-center"
              onClick={toggleSortOrder}
            >
              {sortOrder === "none" && <SortByDate />}
              {sortOrder === "asc" && <SortUpIcon />}
              {sortOrder === "desc" && <SortDownIcon />}
            </button>
            <button
              className="btn_1 flex justify-center items-center"
              onClick={() => setFilterModal(true)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className="mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
            {sortedTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">Транзакции отсутствуют</p>
        )}
      </section>
    </>
  );
}
