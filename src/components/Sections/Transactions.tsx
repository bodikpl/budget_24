import { useState } from "react";
import Modal from "../Widgets/Modal";
import TransactionCard from "../Widgets/TransactionCard";
import { Currency, Transaction } from "../../lib/types";
import {
  FilterIcon,
  SortByDate,
  SortDownIcon,
  SortUpIcon,
} from "../Widgets/Icons";
import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import { useLocalStorage } from "usehooks-ts";

type TransactionsProps = { transactions: Transaction[] };

export default function Transactions({ transactions }: TransactionsProps) {
  const [filterModal, setFilterModal] = useState(false);

  const [filter, setFilter] = useState<"day" | "month" | "year" | "all">(
    "month"
  );
  const [type, setType] = useState<"all" | "expense" | "income">("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );

  const today = new Date();

  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localMainCurrency] = useLocalStorage<string>("localMainCurrency", "");

  // Функция для получения курса валюты по ее названию
  const getExchangeRate = (currencyTitle: string) => {
    const currency = localCurrency.find((c) => c.title === currencyTitle);
    return currency ? currency.exchangeRate : 1; // Если курс не найден, считаем, что это 1
  };

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

  // Фильтрация по категории
  const filteredByCategory = filteredByType.filter((transaction) => {
    if (selectedCategory === "all") {
      return true;
    }
    return transaction.category === selectedCategory;
  });

  // Расчет сумм расходов по категориям с учетом курса валют
  const categorySums = filteredByDate.reduce((acc, transaction) => {
    if (transaction.transactionType === "expense") {
      const exchangeRate = getExchangeRate(transaction.currency); // Получаем курс валюты для текущей транзакции
      const amountInBaseCurrency = transaction.amount * exchangeRate; // Переводим сумму в основную валюту
      acc[transaction.category] =
        (acc[transaction.category] || 0) + amountInBaseCurrency;
    }
    return acc;
  }, {} as Record<string, number>);

  // Сортировка категорий по суммам
  const sortedCategories = Object.entries(categorySums).sort(
    (a, b) => b[1] - a[1] // Сортировка по убыванию
  );

  // Сортировка транзакций
  const sortedTransactions = [...filteredByCategory].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.amount - b.amount;
    }
    if (sortOrder === "desc") {
      return b.amount - a.amount;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Функция для переключения сортировки
  const toggleSortOrder = () => {
    if (sortOrder === "none") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("none");
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

              <p className="mt-4">По категориям (суммы расходов)</p>
              <div className="mt-1 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setFilterModal(false);
                    setSelectedCategory("all");
                  }}
                  className={`btn_2 ${
                    selectedCategory === "all" ? "ring-2 ring-neutral-500" : ""
                  }`}
                >
                  Все
                </button>
                {sortedCategories.map(([category, sum]) => (
                  <button
                    key={category}
                    onClick={() => {
                      setFilterModal(false);
                      setSelectedCategory(category);
                    }}
                    className={`btn_2 whitespace-nowrap ${
                      selectedCategory === category
                        ? "ring-2 ring-neutral-500"
                        : ""
                    }`}
                  >
                    {category}, {sum.toFixed(2)}, {localMainCurrency}
                  </button>
                ))}
              </div>
            </>
          }
        />
      )}

      <section className="w-full">
        <div className="flex justify-between items-center">
          <h3>Транзакции</h3>

          <div className="flex gap-4">
            {sortedTransactions.length > 0 && (
              <button
                className="btn_1 flex justify-center items-center"
                onClick={toggleSortOrder}
              >
                {sortOrder === "none" && <SortByDate />}
                {sortOrder === "asc" && <SortUpIcon />}
                {sortOrder === "desc" && <SortDownIcon />}
              </button>
            )}

            <button
              className="btn_1 flex justify-center items-center"
              onClick={() => setFilterModal(true)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className="mt-2 bg-white shadow-lg rounded-lg max-h-[680px] overflow-y-auto">
            {sortedTransactions.map((transaction) => (
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
