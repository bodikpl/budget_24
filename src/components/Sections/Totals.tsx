import { useState } from "react";
import Modal from "../Modal";
import TotalCard from "../TotalCard";

function Totals() {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  return (
    <>
      {incomeModal && (
        <Modal title="Добавить доход" setModal={setIncomeModal} />
      )}
      {expensesModal && (
        <Modal title="Внести расход" setModal={setExpensesModal} />
      )}

      <section className="bg-white shadow-lg p-2 rounded-xl flex gap-4">
        <TotalCard
          title="Доходы"
          color="#dcfce7"
          amount={9135}
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
export default Totals;
