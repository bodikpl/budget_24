import AccountCard from "./components/AccountCard";
import TotalCard from "./components/TotalCard";
import { accounts } from "../data.ts";
import TransactionCard from "./components/TransactionCard.tsx";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && (
        <div className="fixed p-4 bg-black/50 backdrop-blur inset-0 z-10">
          <div className="bg-white p-4 rounded-xl max-w-lg mx-auto mt-10">
            <button onClick={() => setModal(false)}>Close</button>
          </div>
        </div>
      )}

      <main className="max-w-lg md:max-w-7xl mx-auto p-4 md:px-10 flex flex-col md:flex-row gap-5 md:gap-10 select-none">
        <div className="w-full flex flex-col gap-5">
          <section className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-black text-white font-aptosSemiBold aspect-square w-10 h-10 flex items-center justify-center">
                BS
              </div>
              <div>
                <p className="text-neutral-500">Баланс</p>
                <p className="text-xl font-aptosBold leading-none">7860 zl</p>
              </div>
            </div>

            <div
              className="flex flex-col items-end cursor-pointer"
              onClick={() => setModal(true)}
            >
              <p className="font-aptosSemiBold">Бюджет 72%</p>
              <p className="text-xl font-aptosBold leading-none">
                3800 / 9200 zl
              </p>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-end">
              <p className="font-aptosSemiBold text-lg">Счета</p>
              <button className="btn_1" onClick={() => setModal(true)}>
                +
              </button>
            </div>

            {accounts.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-2 items-center">
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    title={account.title}
                    currency={account.currency}
                    color={account.color}
                    balance={account.balance}
                  />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">Добавьте первый счет</p>
            )}
          </section>

          <section className="bg-white shadow-lg p-2 rounded-xl flex gap-4">
            <TotalCard
              title="Доходы"
              color="#dcfce7"
              amount={9135}
              setModal={setModal}
            />
            <TotalCard
              title="Расходы"
              color="#fee2e2"
              amount={6327}
              setModal={setModal}
            />
          </section>
        </div>

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

          <section className="w-full">
            <div className="flex justify-between items-center">
              <p className="font-aptosSemiBold text-lg">Транзакции</p>
              <button>Показать все</button>
            </div>
            <div className="mt-2 bg-white shadow-lg rounded-lg">
              <TransactionCard
                category="Продукты"
                accountTitle="ПриватБанк"
                amount={-400}
                currency={"грн"}
                date="01.12"
                description="Карфур покупка на АлиЭкспресс Карфур покупка на АлиЭкспресс Карфур покупка на АлиЭкспресс"
              />
              <TransactionCard
                category="Продукты"
                accountTitle="ПриватБанк"
                amount={-400}
                currency={"грн"}
                date="01.12"
                description="Карфур покупка"
              />
              <TransactionCard
                category="Продукты"
                accountTitle="ПриватБанк"
                amount={-400}
                currency={"грн"}
                date="01.12"
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
