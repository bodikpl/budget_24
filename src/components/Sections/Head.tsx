import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "../Modal";
import SettingsModalContent from "../ModalContents/SettingsModalContent";
import BudgetModalContent from "../ModalContents/BudgetModalContent";
import BalanceModalContent from "../ModalContents/BalanceModalContent";
import { Account, Balance, Currency } from "../../lib/types";

const expenses = 3800;

export default function Head() {
  const [settingsModal, setSettingsModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);

  const [localBudget] = useLocalStorage<number>("localBudget", 0);
  const [localMainCurrency] = useLocalStorage<string>("localMainCurrency", "");
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);

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

  const balance: Balance[] = useMemo(() => {
    if (!localCurrency.length || !localAccounts.length) return [];

    return localCurrency.map((targetCurrency) => {
      const total = localAccounts.reduce((sum, account) => {
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === account.currency
        );
        const accountBalance =
          typeof account.balance === "string"
            ? parseFloat(account.balance)
            : typeof account.balance === "number"
            ? account.balance
            : 0;

        if (sourceCurrency) {
          const convertedAmount =
            (accountBalance / sourceCurrency.exchangeRate) *
            targetCurrency.exchangeRate;
          return sum + convertedAmount;
        }
        return sum;
      }, 0);

      return {
        currency: targetCurrency.title,
        total: total.toFixed(2),
      };
    });
  }, [localAccounts, localCurrency]);

  const mainCurrencyBalance =
    balance.find((b) => b.currency === localMainCurrency)?.total || "0.00";

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
          node={<BalanceModalContent balance={balance} />}
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
              {mainCurrencyBalance} {localMainCurrency}
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
