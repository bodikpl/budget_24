import { useState } from "react";
import Modal from "../Widgets/Modal";
import TotalCard from "../Widgets/TotalCard";
import { Currency, Language, TextType, Transaction } from "../../lib/types";
import { useLocalStorage } from "usehooks-ts";
import TransactionModalContent from "../ModalContents/TransactionModalContent";
import { calculateSumsInCurrencies } from "../../lib/fn";

type TotalsProps = {
  userLanguage: Language;
  text: TextType;
  transactions: Transaction[];
};

export default function Totals({
  transactions,
  userLanguage,
  text,
}: TotalsProps) {
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
          title={text.addIncome[userLanguage]}
          setModal={setIncomeModal}
          node={
            <TransactionModalContent
              userLanguage={userLanguage}
              text={text}
              transactionType="income"
              setModal={setIncomeModal}
            />
          }
        />
      )}
      {expensesModal && (
        <Modal
          title={text.addExpense[userLanguage]}
          setModal={setExpensesModal}
          node={
            <TransactionModalContent
              userLanguage={userLanguage}
              text={text}
              transactionType="expense"
              setModal={setExpensesModal}
            />
          }
        />
      )}

      <section className="bg-white dark:bg-neutral-800 dark:text-white shadow-lg p-2 rounded-xl flex gap-2">
        <TotalCard
          title={text.incomes[userLanguage]}
          color="#dcfce7"
          amount={
            incomeTotals.filter(
              (total) => total.currency === localMainCurrency
            )[0].total
          }
          setModal={setIncomeModal}
        />
        <TotalCard
          title={text.expenses[userLanguage]}
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
