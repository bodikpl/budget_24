import { useState } from "react";
import Modal from "../Widgets/Modal";
import TransactionCard from "../Widgets/TransactionCard";
import { Language, TextType, Transaction } from "../../lib/types";
import {
  FilterIcon,
  ChartIcon,
  SortByDate,
  SortDownIcon,
  SortUpIcon,
} from "../Widgets/Icons";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import GroupedTransactions from "../Widgets/GroupedTransactions";

type TransactionsProps = {
  userLanguage: Language;
  text: TextType;
  transactions: Transaction[];
};

export default function Transactions({
  userLanguage,
  text,
  transactions,
}: TransactionsProps) {
  const [filterModal, setFilterModal] = useState(false);

  const [filter, setFilter] = useState<"day" | "month" | "year" | "all">(
    "month"
  );
  const [type, setType] = useState<"all" | "expense" | "income">("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [chartReport, setChartReport] = useState(false);

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
    // if (sortOrder === "asc") {
    //   return a.amount - b.amount; // Сортировка по возрастанию
    // }
    // if (sortOrder === "desc") {
    //   return b.amount - a.amount; // Сортировка по убыванию
    // }
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Исходная сортировка по дате
  });

  // Функция для переключения сортировки
  // const toggleSortOrder = () => {
  //   if (sortOrder === "none") {
  //     setSortOrder("desc"); // Переключаем на убывание
  //   } else if (sortOrder === "desc") {
  //     setSortOrder("asc"); // Переключаем на возрастание
  //   } else {
  //     setSortOrder("none"); // Сбрасываем к сортировке по дате
  //   }
  // };

  return (
    <>
      {filterModal && (
        <Modal
          title={text.filter[userLanguage]}
          setModal={setFilterModal}
          node={
            <>
              <p>{text.byDate[userLanguage]}</p>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`btn_2 ${
                    filter === "all" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  {text.all[userLanguage]}
                </button>
                <button
                  onClick={() => setFilter("day")}
                  className={`btn_2 ${
                    filter === "day" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  {text.today[userLanguage]}
                </button>
                <button
                  onClick={() => setFilter("month")}
                  className={`btn_2 ${
                    filter === "month" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  {text.month[userLanguage]}
                </button>
                <button
                  onClick={() => setFilter("year")}
                  className={`btn_2 ${
                    filter === "year" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  {text.year[userLanguage]}
                </button>
              </div>

              <p className="mt-4">{text.byTransactionType[userLanguage]}</p>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => {
                    setType("all");
                  }}
                  className={`btn_2 ${
                    type === "all" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  {text.all[userLanguage]}
                </button>
                <button
                  onClick={() => {
                    setType("expense");
                  }}
                  className={`btn_2 ${
                    type === "expense" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  {text.expenses[userLanguage]}
                </button>
                <button
                  onClick={() => {
                    setType("income");
                  }}
                  className={`btn_2 ${
                    type === "income" ? "ring-2 ring-neutral-400" : ""
                  }`}
                >
                  {text.incomes[userLanguage]}
                </button>
              </div>
            </>
          }
        />
      )}

      <section className="w-full">
        <div className="mt-4 flex justify-between items-center">
          <h3>{text.transactions[userLanguage]}</h3>

          <div className="flex gap-4">
            <button
              className="btn_1 flex justify-center items-center"
              onClick={() => setChartReport(!chartReport)}
            >
              <ChartIcon />
            </button>
            {/* <button
              className="btn_1 flex justify-center items-center"
              onClick={toggleSortOrder}
            >
              {sortOrder === "none" && <SortByDate />}
              {sortOrder === "asc" && <SortUpIcon />}
              {sortOrder === "desc" && <SortDownIcon />}
            </button> */}
            <button
              className="btn_1 flex justify-center items-center"
              onClick={() => setFilterModal(true)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>

        {transactions.length > 0 ? (
          <>
            {chartReport ? (
              <div className="mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
                <GroupedTransactions
                  userLanguage={userLanguage}
                  text={text}
                  transactions={transactions}
                />
              </div>
            ) : (
              <div className="mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
                {sortedTransactions.map((transaction) => (
                  <TransactionCard
                    userLanguage={userLanguage}
                    text={text}
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-neutral-500">{text.noTansactions[userLanguage]}</p>
        )}
      </section>
    </>
  );
}
