import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "../Widgets/Modal";
import SettingsModalContent from "../ModalContents/SettingsModalContent";
import BudgetModalContent from "../ModalContents/BudgetModalContent";
import BalanceModalContent from "../ModalContents/BalanceModalContent";
import { Account, Balance, Currency, Transaction } from "../../lib/types";

const expenses = 3800;

export default function Head() {
  const [settingsModal, setSettingsModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);

  const [localBudget] = useLocalStorage<number>("localBudget", 0);
  const [localMainCurrency] = useLocalStorage<string>("localMainCurrency", "");
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localIncomeTransactions] = useLocalStorage<Transaction[]>(
    "localIncomeTransactions",
    []
  );

  const budgetUsagePercentage = localBudget
    ? Math.round((expenses / localBudget) * 100)
    : 0;

  const percentageTextColor =
    budgetUsagePercentage > 90
      ? "text-red-500"
      : budgetUsagePercentage > 80
      ? "text-orange-500"
      : budgetUsagePercentage > 60
      ? "text-black"
      : "text-neutral-500";

  // Получаем сумму стартовых балансов со всех карт
  const accountsBalances: Balance[] = useMemo(() => {
    if (!localCurrency.length || !localAccounts.length) return [];

    return localCurrency.map((targetCurrency) => {
      const total = localAccounts.reduce((sum, account) => {
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === account.currency
        );

        if (sourceCurrency) {
          const convertedAmount =
            (account.initialBalance / sourceCurrency.exchangeRate) *
            targetCurrency.exchangeRate;
          return sum + convertedAmount;
        }
        return sum;
      }, 0);

      return {
        currency: targetCurrency.title,
        total: total,
      };
    });
  }, [localAccounts, localCurrency]);

  // Получаем сумму доходов со всех карт
  const incomesBalances: Balance[] = useMemo(() => {
    if (!localCurrency.length || !localAccounts.length) return [];

    return localCurrency.map((targetCurrency) => {
      const total = localIncomeTransactions.reduce((sum, transaction) => {
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === transaction.currency
        );

        if (sourceCurrency) {
          const convertedAmount =
            (transaction.amount / sourceCurrency.exchangeRate) *
            targetCurrency.exchangeRate;
          return sum + convertedAmount;
        }
        return sum;
      }, 0);

      return {
        currency: targetCurrency.title,
        total: total,
      };
    });
  }, [localAccounts, localCurrency]);

  console.log(incomesBalances);

  const accountsBalanceInMainCurrency =
    accountsBalances.find((b) => b.currency === localMainCurrency)?.total || 0;
  const incomesBalanceInMainCurrency =
    incomesBalances.find((b) => b.currency === localMainCurrency)?.total || 0;

  const balance = accountsBalanceInMainCurrency + incomesBalanceInMainCurrency;

  // const calculateIncomeTransactionsSumsInCurrencies = () => {
  //   if (localCurrency && localIncomeTransactions) {
  //     // Рассчитать суммы для каждой валюты
  //     const sums = localCurrency.map((targetCurrency) => {
  //       const total = localIncomeTransactions.reduce((sum, transaction) => {
  //         // Найти курс исходной валюты
  //         const sourceCurrency = localCurrency.find(
  //           (cur) => cur.title === transaction.currency
  //         );

  //         if (!sourceCurrency) return sum; // Пропустить, если курс не найден

  //         // Перевести в целевую валюту
  //         const amountInTargetCurrency =
  //           (Number(transaction.amount) / sourceCurrency.exchangeRate) *
  //           targetCurrency.exchangeRate;

  //         return sum + amountInTargetCurrency;
  //       }, 0);

  //       return {
  //         currency: targetCurrency.title,
  //         total: total,
  //       };
  //     });
  //     return sums;
  //   } else {
  //     return [{ currency: "", total: 0 }];
  //   }
  // };

  // const incomeTransactionsSums = calculateIncomeTransactionsSumsInCurrencies();

  // const totalBalance =
  //   localAccountsSumsInMainCurrency +
  //   incomeTransactionsSums.filter(
  //     (res) => res.currency === localMainCurrency
  //   )[0].total;

  return (
    <>
      {settingsModal && (
        <Modal
          title="Настройки"
          setModal={setSettingsModal}
          node={<SettingsModalContent setModal={setSettingsModal} />}
        />
      )}
      {budgetModal && (
        <Modal
          title="Бюджет"
          setModal={setBudgetModal}
          node={<BudgetModalContent setModal={setBudgetModal} />}
        />
      )}
      {balanceModal && (
        <Modal
          title="Баланс"
          setModal={setBalanceModal}
          node={<BalanceModalContent balance={accountsBalances} />}
        />
      )}

      <section className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSettingsModal(true)}
            className="rounded-full bg-black text-white font-aptosSemiBold aspect-square w-10 h-10 flex items-center justify-center"
          >
            BS
          </button>
          <div onClick={() => setBalanceModal(true)} className="cursor-pointer">
            <p className="text-neutral-500">Баланс</p>
            <p className="text-xl font-aptosBold leading-none">
              {localAccounts.length > 0 ? balance.toFixed(1) : 0}{" "}
              {localMainCurrency ? localMainCurrency : ""}
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-end cursor-pointer"
          onClick={() => setBudgetModal(true)}
        >
          <p className={`font-aptosSemiBold ${percentageTextColor}`}>
            Бюджет {localBudget ? `${budgetUsagePercentage}%` : ""}
          </p>
          {localBudget && (
            <p className="text-xl font-aptosBold leading-none">
              {expenses} / {localBudget} {localMainCurrency}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
