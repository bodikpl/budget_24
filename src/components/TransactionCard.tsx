function TransactionCard({
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
    <div className="flex items-center p-3 overflow-hidden border-b border-neutral-200 last:border-none">
      <div className="aspect-square w-10 h-10 rounded-full text-3xl leading-none flex justify-center items-center bg-yellow-100">
        +
      </div>

      <div className="w-full ml-4 flex flex-col justify-center">
        <div className="flex gap-4 justify-between items-center">
          <p>
            {date} - {category}
          </p>
          <p className="whitespace-nowrap text-right text-[#EA4335] text-xl font-aptosBold">
            {amount} <span className="text-xs">{currency}</span>
          </p>
        </div>
        <div className="flex gap-4 justify-between text-xs text-neutral-500">
          <p>{description}</p>
          <p className="whitespace-nowrap font-aptosSemiBold">
            {accountTitle}, {currency}
          </p>
        </div>
      </div>
    </div>
  );
}
export default TransactionCard;
