function TransactionContent({
  category,
  amount,
  accountTitle,
  currency,
  date,
  description,
}: {
  category: string;
  amount: number;
  accountTitle: string;
  currency: string;
  date: string;
  description?: string;
}) {
  return (
    <div>
      <h3>{category}</h3>
      <p>{amount}</p>
      <p>{accountTitle}</p>
      <p>{currency}</p>
      <p>{date}</p>
      <p>{description}</p>
    </div>
  );
}
export default TransactionContent;
