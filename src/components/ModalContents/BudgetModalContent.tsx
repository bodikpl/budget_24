import { useLocalStorage } from "usehooks-ts";

type BudgetModalContentProps = {};

export default function BudgetModalContent({}: BudgetModalContentProps) {
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
    </>
  );
}
