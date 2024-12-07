import { useState } from "react";
import Modal from "../Widgets/Modal";
import TotalCard from "../Widgets/TotalCard";
import { Currency, Transaction } from "../../lib/types";
import { useLocalStorage } from "usehooks-ts";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { calculateSumsInCurrencies } from "../../lib/fn";

type TotalsProps = {
  transactions: Transaction[];
};

export default function Totals({ transactions }: TotalsProps) {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);

  const [localCurrency] = useLocalStorage<Currency[]>("localCurrency", []);
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");

  const incomeTotals = calculateSumsInCurrencies(
    transactions.filter(
      (transaction) => transaction.transactionType === "income"
    ),
    localCurrency
  );

  const expensesTotals = calculateSumsInCurrencies(
    transactions.filter(
      (transaction) => transaction.transactionType === "expense"
    ),
    localCurrency
  );

  return (
    <>
      {incomeModal && (
        <Modal
          title="Добавить доход"
          setModal={setIncomeModal}
          node={
            <TransactionModalContent
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
            <TransactionModalContent
              transactionType="expense"
              setModal={setExpensesModal}
            />
          }
        />
      )}

      <section className="bg-white shadow-lg p-2 rounded-xl flex gap-2">
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
