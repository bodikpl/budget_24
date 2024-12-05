import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "../Modal";
import SettingsModalContent from "../ModalContents/SettingsModalContent";
import BudgetModalContent from "../ModalContents/BudgetModalContent";

function Head() {
  const [settingsModal, setSettingsModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);

  const [localBudget] = useLocalStorage<string | number>("localBudget", 0);
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  return (
    <>
      {settingsModal && (
        <Modal
          title="Настройки"
          setModal={setSettingsModal}
          node={<SettingsModalContent />}
        />
      )}
      {budgetModal && (
        <Modal
          title="Бюджет"
          setModal={setBudgetModal}
          node={<BudgetModalContent />}
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
          <div>
            <p className="text-neutral-500">Баланс</p>
            <p className="text-xl font-aptosBold leading-none">7860 zl</p>
          </div>
        </div>

        <div
          className="flex flex-col items-end cursor-pointer"
          onClick={() => setBudgetModal(true)}
        >
          <p className="font-aptosSemiBold">
            Бюджет {localBudget ? "72%" : ""}
          </p>
          {localBudget && (
            <p className="text-xl font-aptosBold leading-none">
              3800 / {localBudget} {localMainCurrency}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
export default Head;
