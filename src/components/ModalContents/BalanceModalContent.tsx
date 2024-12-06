import { Balance } from "../../lib/types";

type BalanceModalContentProps = {
  balance: Balance[];
};

export default function BalanceModalContent({
  balance,
}: BalanceModalContentProps) {
  return (
    <>
      {balance.length > 0 ? (
        <>
          {balance.map((b) => (
            <p key={b.currency}>
              {b.total} {b.currency}
            </p>
          ))}
        </>
      ) : (
        <p>Сначала ыыберите валюту и добавьте счета</p>
      )}
    </>
  );
}
