import { useLocalStorage } from "usehooks-ts";

type BudgetModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BudgetModalContent({
  setModal,
}: BudgetModalContentProps) {
  const [localBudget, setLocalBudget] = useLocalStorage<string | number>(
    "localBudget",
    0
  );

  const handleBudgetChange = (value: string) => {
    setLocalBudget(value === "" ? "" : parseFloat(value) || 0);
  };

  return (
    <>
      <h3>Сумма расходов на месяц</h3>
      <input
        type="number"
        placeholder="Введите планируемую сумму"
        className="w-full"
        value={localBudget === 0 ? "" : localBudget}
        onChange={(e) => handleBudgetChange(e.target.value)}
      />
      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => setModal(false)}
        disabled={!localBudget}
      >
        Сохранить
      </button>
    </>
  );
}
