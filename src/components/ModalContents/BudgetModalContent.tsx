import { useLocalStorage } from "usehooks-ts";
import { Language, TextType } from "../../lib/types";

type BudgetModalContentProps = {
  userLanguage: Language;
  text: TextType;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BudgetModalContent({
  userLanguage,
  text,
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
      <h3>{text.monthlyExpenses[userLanguage]}</h3>
      <input
        type="number"
        placeholder={text.enterPlannedAmount[userLanguage]}
        className="w-full dark:bg-transparent dark:text-white"
        value={localBudget === 0 ? "" : localBudget}
        onChange={(e) => handleBudgetChange(e.target.value)}
      />
      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => setModal(false)}
        disabled={!localBudget}
      >
        {text.save[userLanguage]}
      </button>
    </>
  );
}
