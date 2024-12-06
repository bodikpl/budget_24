import { useState } from "react";
import Modal from "../Widgets/Modal";
import TotalCard from "../Widgets/TotalCard";
import IncomeModalContent from "../ModalContents/IncomeModalContent";
import ExpenseModalContent from "../ModalContents/ExpenseModalContent";

function Totals() {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);

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
