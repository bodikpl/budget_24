import { getFormattedDate } from "../../lib/fn";
import { Transaction } from "../../lib/types";

type TransactionModalContentProps = {
  transaction: Transaction;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionModalContent({
  transaction,
  setModal,
}: TransactionModalContentProps) {
  const formattedDate = getFormattedDate(transaction.date);
  return (
    <div>
      <h3>{transaction.category}</h3>
      <p>{transaction.amount}</p>
      <p>{transaction.accountTitle}</p>
      <p>{transaction.currency}</p>
      <p>{formattedDate}</p>
      <p>{transaction.description}</p>

      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => {
          setModal(false);
        }}
        // disabled={!selectedAccount || !selectedCategory || !amount}
      >
        Удалить
      </button>
    </div>
  );
}
