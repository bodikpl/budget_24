import { useState } from "react";
import Modal from "../Widgets/Modal";
import TotalCard from "../Widgets/TotalCard";
import IncomeModalContent from "../ModalContents/IncomeModalContent";
import ExpenseModalContent from "../ModalContents/ExpenseModalContent";
import { Currency, Transaction } from "../../lib/types";
import { useLocalStorage } from "usehooks-ts";

type TotalsProps = { incomeTransactions: Transaction[] };

export default function Totals({ incomeTransactions }: TotalsProps) {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);

  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");

  const calculateSumsInCurrencies = () => {
    // Рассчитать суммы для каждой валюты
    const sums = localCurrency.map((targetCurrency) => {
      const total = incomeTransactions.reduce((sum, transaction) => {
        // Найти курс исходной валюты
        const sourceCurrency = localCurrency.find(
          (cur) => cur.title === transaction.currency
        );

        if (!sourceCurrency) return sum; // Пропустить, если курс не найден

        // Перевести в целевую валюту
        const amountInTargetCurrency =
          (Number(transaction.amount) / sourceCurrency.exchangeRate) *
          targetCurrency.exchangeRate;

        return sum + amountInTargetCurrency;
      }, 0);

      return {
        currency: targetCurrency.title,
        total: total,
      };
    });

    return sums;
  };

  const result = calculateSumsInCurrencies();

  return (
    <>
      {incomeModal && (
        <Modal
          title="Добавить доход"
          setModal={setIncomeModal}
          node={<IncomeModalContent setModal={setIncomeModal} />}
        />
      )}
      {expensesModal && (
        <Modal
          title="Внести расход"
          setModal={setExpensesModal}
          node={<ExpenseModalContent setModal={setExpensesModal} />}
        />
      )}

      <section className="bg-white shadow-lg p-2 rounded-xl flex gap-4">
        <TotalCard
          title="Доходы"
          color="#dcfce7"
          amount={
            result.filter((res) => res.currency === localMainCurrency)[0].total
          }
          setModal={setIncomeModal}
        />
        <TotalCard
          title="Расходы"
          color="#fee2e2"
          amount={6327}
          setModal={setExpensesModal}
        />
      </section>
    </>
  );
}
