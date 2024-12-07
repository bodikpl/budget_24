import { useLocalStorage } from "usehooks-ts";
import Accounts from "./components/Sections/Accounts.tsx";
import Head from "./components/Sections/Head.tsx";
import Totals from "./components/Sections/Totals.tsx";
import Transactions from "./components/Sections/Transactions.tsx";
import { Transaction } from "./lib/types.ts";

function App() {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  const [localIncomeTransactions] = useLocalStorage<Transaction[]>(
    "localIncomeTransactions",
    []
  );
  const [localExpensesTransactions] = useLocalStorage<Transaction[]>(
    "localExpensesTransactions",
    []
  );

  const transactions = [
    ...localIncomeTransactions,
    ...localExpensesTransactions,
  ];
  return (
    <>
      <main className="max-w-lg md:max-w-7xl mx-auto p-4 md:px-10 flex flex-col md:flex-row gap-5 md:gap-10 select-none">
        <div className="w-full flex flex-col gap-5">
          <Head />
          <Accounts />
          {localMainCurrency && (
            <Totals
              incomeTransactions={localIncomeTransactions}
              expensesTransactions={localExpensesTransactions}
            />
          )}
        </div>

        {transactions.length > 0 ? (
          <div className="w-full flex flex-col gap-4">
            <section className="flex gap-2 select-none">
              <button className="w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all">
                Сегодня
              </button>
              <button className="w-full bg-neutral-200 rounded-lg p-2 font-aptosSemiBold hover:bg-neutral-200 hover:text-neutral-800 transition-all">
                За месяц
              </button>
              <button className="w-full rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-all">
                За год
              </button>
            </section>

            <Transactions transactions={transactions} />
          </div>
        ) : (
          <p className="text-neutral-500">Транзакции отсутствуют</p>
        )}
      </main>
    </>
  );
}

export default App;
