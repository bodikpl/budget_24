function TotalCard({
  title,
  color,
  amount,
}: {
  title: string;
  color: string;
  amount: number;
}) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="rounded-lg p-3 pb-2 w-full flex justify-between items-start relative"
    >
      <div>
        <p className="font-aptosSemiBold text-sm">{title}</p>
        <p className="text-xl font-aptosBold">
          {amount} <span className="font-aptosSemiBold text-lg">pln</span>
        </p>
      </div>
      <button className="btn_1 absolute top-2 right-2">+</button>
    </div>
  );
}
export default TotalCard;
