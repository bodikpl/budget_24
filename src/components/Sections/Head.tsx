import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "../Widgets/Modal";
import SettingsModalContent from "../ModalContents/SettingsModalContent";
import BudgetModalContent from "../ModalContents/BudgetModalContent";
import BalanceModalContent from "../ModalContents/BalanceModalContent";
import { Account, Balance, Currency, Transaction } from "../../lib/types";
import { calculateSumsInCurrencies } from "../../lib/fn";

export default function Head() {
  const [settingsModal, setSettingsModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);

  const [localBudget] = useLocalStorage<number>("localBudget", 0);
  const [localMainCurrency] = useLocalStorage<string>("localMainCurrency", "");
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localTransactions] = useLocalStorage<Transaction[]>(
    "localTransactions",
    []
  );

  // Получаем сумму стартовых балансов со всех карт
  const accountsBalances: Balance[] = localCurrency.map((targetCurrency) => {
    const total = localAccounts.reduce((sum, account) => {
      const sourceCurrency = localCurrency.find(
        (cur) => cur.title === account.currency
      );
      if (!sourceCurrency) return sum;

      return (
        sum +
        (account.initialBalance / sourceCurrency.exchangeRate) *
          targetCurrency.exchangeRate
      );
    }, 0);

    return { currency: targetCurrency.title, total };
  });

  // Получаем сумму доходов со всех карт
  const incomesBalances: Balance[] = localCurrency.map((targetCurrency) => {
    const total = localTransactions
      .filter((transaction) => transaction.transactionType === "income")
      .reduce((sum, transaction) => {
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === transaction.currency
        );
        if (!sourceCurrency) return sum;

        return (
          sum +
          (transaction.amount / sourceCurrency.exchangeRate) *
            targetCurrency.exchangeRate
        );
      }, 0);

    return { currency: targetCurrency.title, total };
  });

  // Получаем сумму расходов со всех карт
  const expensesBalances: Balance[] = localCurrency.map((targetCurrency) => {
    const total = localTransactions
      .filter((transaction) => transaction.transactionType === "expense")
      .reduce((sum, transaction) => {
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === transaction.currency
        );
        if (!sourceCurrency) return sum;

        return (
          sum +
          (transaction.amount / sourceCurrency.exchangeRate) *
            targetCurrency.exchangeRate
        );
      }, 0);

    return { currency: targetCurrency.title, total };
  });

  const accountsBalanceInMainCurrency =
    accountsBalances.find((b) => b.currency === localMainCurrency)?.total || 0;
  const incomesBalanceInMainCurrency =
    incomesBalances.find((b) => b.currency === localMainCurrency)?.total || 0;
  const expensesBalanceInMainCurrency =
    expensesBalances.find((b) => b.currency === localMainCurrency)?.total || 0;

  const balance =
    accountsBalanceInMainCurrency +
    incomesBalanceInMainCurrency +
    expensesBalanceInMainCurrency;

  const expenses = calculateSumsInCurrencies(
    localTransactions.filter(
      (transaction) => transaction.transactionType === "expense"
    ),
    localCurrency
  );

  const budgetUsagePercentage = localBudget
    ? Math.round(
        (expenses.filter((expense) => expense.currency === localMainCurrency)[0]
          .total /
          localBudget) *
          100
      )
    : 0;

  const formattedExpenses =
    expenses.length > 0
      ? expenses.filter((expense) => expense.currency === localMainCurrency)[0]
          .total * -1
      : 0;

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
          node={
            <BalanceModalContent
              mainCurrency={localMainCurrency}
              balance={balance}
              localCurrency={localCurrency}
            />
          }
        />
      )}

      <section className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSettingsModal(true)}
            className="rounded-full bg-black text-white dark:bg-neutral-600 font-aptosSemiBold aspect-square w-10 h-10 flex items-center justify-center"
          >
            BS
          </button>
          <div onClick={() => setBalanceModal(true)} className="cursor-pointer">
            <p className="font-aptosSemiBold text-neutral-500">Баланс</p>
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
          <p className={"font-aptosSemiBold text-neutral-500"}>
            Бюджет {localBudget ? `${budgetUsagePercentage * -1}%` : ""}
          </p>
          {localBudget && (
            <p className="text-xl font-aptosBold leading-none">
              {formattedExpenses.toFixed(0)} / {localBudget} {localMainCurrency}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
