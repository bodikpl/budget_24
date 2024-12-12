import { useState } from "react";
import { Currency, Language, TextType, Transaction } from "../../lib/types";
import TransactionCard from "./TransactionCard";
import { calculateSumsInCurrencies } from "../../lib/fn";
import { useLocalStorage } from "usehooks-ts";

type GroupedTransactionsProps = {
  userLanguage: Language;
  text: TextType;
  transactions: Transaction[];
};

export default function GroupedTransactions({
  userLanguage,
  text,
  transactions,
}: GroupedTransactionsProps) {
  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");

  // Группируем и сортируем транзакции по категориям
  const sortedCategories = Object.entries(
    transactions
      .filter((transaction) => transaction.transactionType === "expense")
      .reduce<Record<string, Transaction[]>>((acc, transaction) => {
        if (!acc[transaction.category]) acc[transaction.category] = [];
        acc[transaction.category].push(transaction);
        return acc;
      }, {})
  ).sort(
    ([, transactionsA], [, transactionsB]) =>
      calculateTotal(transactionsA, localCurrency, localMainCurrency) -
      calculateTotal(transactionsB, localCurrency, localMainCurrency)
  );

  const expensesTotals =
    calculateSumsInCurrencies(
      transactions.filter(
        (transaction) => transaction.transactionType === "expense"
      ),
      localCurrency
    )
      .find((total) => total.currency === localMainCurrency)
      ?.total.toFixed(2) || 0;

  return (
    <>
      {sortedCategories.map(([category, transactions]) => (
        <Group
          key={category}
          category={category}
          transactions={transactions}
          userLanguage={userLanguage}
          text={text}
          localCurrency={localCurrency}
          localMainCurrency={localMainCurrency}
          expensesTotals={expensesTotals}
        />
      ))}
    </>
  );
}

type GroupProps = {
  category: string;
  transactions: Transaction[];
  userLanguage: Language;
  text: TextType;
  localCurrency: Currency[];
  localMainCurrency: string;
  expensesTotals: string | 0;
};

function Group({
  category,
  transactions,
  userLanguage,
  text,
  localCurrency,
  localMainCurrency,
  expensesTotals,
}: GroupProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryTotal = calculateTotal(
    transactions,
    localCurrency,
    localMainCurrency
  );

  const percentage =
    +expensesTotals < 0
      ? ((categoryTotal / +expensesTotals) * 100).toFixed(2)
      : "0";

  return (
    <div className="w-full border-b last:border-none">
      <div className="relative">
        {/* Полоса графика */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-[#FEE2E2]"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Контент строки */}
        <div
          className={`px-4 relative z-10 ${
            expanded ? "pt-4" : "pt-4 pb-4"
          } flex gap-2 items-center justify-between font-aptosSemiBold`}
          onClick={() => setExpanded(!expanded)}
        >
          <p>
            {category} - {percentage}%
          </p>
          <p>
            {categoryTotal.toFixed(2)}
            {localMainCurrency}
          </p>
        </div>
      </div>

      {expanded && (
        <div>
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              userLanguage={userLanguage}
              text={text}
              transaction={transaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Вспомогательная функция для расчёта суммы категории
function calculateTotal(
  transactions: Transaction[],
  localCurrency: Currency[],
  localMainCurrency: string
): number {
  const totals = calculateSumsInCurrencies(transactions, localCurrency);
  return (
    totals.find((total) => total.currency === localMainCurrency)?.total || 0
  );
}
