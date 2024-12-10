import { useLocalStorage } from "usehooks-ts";
import { format, addMonths, subMonths, isSameMonth, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Accounts from "./components/Sections/Accounts.tsx";
import Head from "./components/Sections/Head.tsx";
import Totals from "./components/Sections/Totals.tsx";
import Transactions from "./components/Sections/Transactions.tsx";
import { Account, Transaction } from "./lib/types.ts";
import useCheckConnection from "./lib/useCheckConnection.tsx";
import { useState } from "react";
import ThemeToggle from "./components/Widgets/ThemeToggle.tsx";
import useTheme from "./lib/useTheme.tsx";

function App() {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  const [localTransactions] = useLocalStorage<Transaction[]>(
    "localTransactions",
    []
  );
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const isOnline = useCheckConnection();

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setSelectedMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => addMonths(prev, 1));
  };

  const filteredTransactions = localTransactions.filter((transaction) =>
    isSameMonth(parseISO(transaction.date.toString()), selectedMonth)
  );

  const { theme } = useTheme();

  return (
    <>
      {!isOnline && <p className="fixed left-4 top-0 text-xs">Нет сети</p>}
      <main className="max-w-lg md:max-w-7xl mx-auto p-4 md:px-10 flex flex-col md:flex-row gap-5 md:gap-10 select-none">
        <div className="w-full flex flex-col gap-5">
          <Head theme={theme} />
          <Accounts />

          {localMainCurrency && localAccounts.length > 0 && (
            <>
              <div className="flex items-center justify-between gap-4 text-lg font-aptosSemiBold">
                <button
                  className="btn_1 flex justify-center items-center"
                  onClick={handlePreviousMonth}
                >
                  <ChewronLeftIcon />
                </button>
                <span className="capitalize">
                  {format(selectedMonth, "LLLL, yyyy", { locale: ru })}
                </span>
                <button
                  className="btn_1 flex justify-center items-center"
                  onClick={handleNextMonth}
                >
                  <ChewronRightIcon />
                </button>
              </div>
              <Totals transactions={filteredTransactions} />
            </>
          )}
        </div>

        {localTransactions.length > 0 ? (
          <div className="w-full flex flex-col gap-4">
            <Transactions transactions={filteredTransactions} />
          </div>
        ) : (
          <p className="w-full text-neutral-500">Транзакции отсутствуют</p>
        )}
      </main>
    </>
  );
}

export default App;

function ChewronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-left"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChewronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
