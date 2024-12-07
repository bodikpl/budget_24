import { useState } from "react";
import Modal from "../Widgets/Modal";
import TotalCard from "../Widgets/TotalCard";
import { Currency, Transaction } from "../../lib/types";
import { useLocalStorage } from "usehooks-ts";
import AddingTransactionModalContent from "../ModalContents/AddingTransactionModalContent";

type TotalsProps = {
  transactions: Transaction[];
};

export default function Totals({ transactions }: TotalsProps) {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);

  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");

  const calculateSumsInCurrencies = (transactions: Transaction[]) => {
    // Рассчитать суммы для каждой валюты
    const sums = localCurrency.map((targetCurrency) => {
      const total = transactions.reduce((sum, transaction) => {
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

  const incomeTotals = calculateSumsInCurrencies(
    transactions.filter(
      (transaction) => transaction.transactionType === "income"
    )
  );

  const expensesTotals = calculateSumsInCurrencies(
    transactions.filter(
      (transaction) => transaction.transactionType === "expense"
    )
  );

  return (
    <>
      {incomeModal && (
        <Modal
          title="Добавить доход"
          setModal={setIncomeModal}
          node={
            <AddingTransactionModalContent
              transactionType="income"
              setModal={setIncomeModal}
            />
          }
        />
      )}
      {expensesModal && (
        <Modal
          title="Внести расход"
          setModal={setExpensesModal}
          node={
            <AddingTransactionModalContent
              transactionType="expense"
              setModal={setExpensesModal}
            />
          }
        />
      )}

      <section className="bg-white shadow-lg p-2 rounded-xl flex gap-4">
        <TotalCard
          title="Доходы"
          color="#dcfce7"
          amount={
            incomeTotals.filter(
              (total) => total.currency === localMainCurrency
            )[0].total
          }
          setModal={setIncomeModal}
        />
        <TotalCard
          title="Расходы"
          color="#fee2e2"
          amount={
            expensesTotals.filter(
              (total) => total.currency === localMainCurrency
            )[0].total
          }
          setModal={setExpensesModal}
        />
      </section>
    </>
  );
}
