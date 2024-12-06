import { getFormattedDate } from "../../lib/fn";
import { Transacion } from "../../lib/types";

type TransactionModalContentProps = { transaction: Transacion };

export default function TransactionModalContent({
  transaction,
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
    </div>
  );
}
