function AccountCard({
  title,
  color,
  currency,
  balance,
}: {
  title: string;
  color: string;
  currency: string;
  balance: string | number;
}) {
  return (
    <div
      className={`${color} rounded-lg p-2 w-full flex justify-between items-start text-xs text-white font-aptosSemiBold`}
    >
      <div>
        <p>
          {title}, <span>{currency}</span>
        </p>
        <p className="text-base font-aptosBold">
          {balance} <span className="text-xs">{currency}</span>
        </p>
      </div>
    </div>
  );
}
export default AccountCard;
