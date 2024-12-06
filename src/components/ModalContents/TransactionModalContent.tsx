import { Transacion } from "../../lib/types";

type TransactionModalContentProps = { transaction: Transacion };

export default function TransactionModalContent({
  transaction,
}: TransactionModalContentProps) {
  return (
    <div>
      <h3>{transaction.category}</h3>
      <p>{transaction.amount}</p>
      <p>{transaction.accountTitle}</p>
      <p>{transaction.currency}</p>
      <p>{transaction.date}</p>
      <p>{transaction.description}</p>
    </div>
  );
}
