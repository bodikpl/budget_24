import { useLocalStorage } from "usehooks-ts";
import Accounts from "./components/Sections/Accounts.tsx";
import Head from "./components/Sections/Head.tsx";
import Totals from "./components/Sections/Totals.tsx";
import Transactions from "./components/Sections/Transactions.tsx";
import { Account, Transaction } from "./lib/types.ts";

function App() {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  const [localTransactions] = useLocalStorage<Transaction[]>(
    "localTransactions",
    []
  );
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  return (
    <>
      <main className="max-w-lg md:max-w-7xl mx-auto p-4 md:px-10 flex flex-col md:flex-row gap-5 md:gap-10 select-none">
        <div className="w-full flex flex-col gap-5">
          <Head />
          <Accounts />
          {localMainCurrency && localAccounts.length > 0 && (
            <Totals transactions={localTransactions} />
          )}
        </div>

        {localTransactions.length > 0 ? (
          <div className="w-full flex flex-col gap-4">
            <Transactions transactions={localTransactions} />
          </div>
        ) : (
          <p className="w-full text-neutral-500">Транзакции отсутствуют</p>
        )}
      </main>
    </>
  );
}

export default App;
