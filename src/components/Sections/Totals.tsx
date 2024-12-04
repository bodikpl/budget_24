import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
import Modal from "../Modal";
import TotalCard from "../TotalCard";

function Totals() {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);

  const [value, setValue, removeValue] = useLocalStorage("test-key", 0);
  return (
    <>
      {incomeModal && (
        <Modal
          title="Добавить доход"
          setModal={setIncomeModal}
          node={
            <div>
              <p>Count: {value}</p>
              <button
                onClick={() => {
                  setValue((x: number) => x + 1);
                }}
              >
                Increment
              </button>
              <button
                onClick={() => {
                  setValue((x: number) => x - 1);
                }}
              >
                Decrement
              </button>
              <button
                onClick={() => {
                  removeValue();
                }}
              >
                Reset
              </button>
            </div>
          }
        />
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
