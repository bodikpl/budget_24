import { useLocalStorage } from "usehooks-ts";
import { Account } from "../../lib/types";

type AccountSelectProps = {
  setModal: (value: Account) => void;
};

export default function AccountSelect({ setModal }: AccountSelectProps) {
  const [localAccounts] = useLocalStorage<Account[]>("localAccounts", []);
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {localAccounts.map((account) => (
          <button
            key={account.id}
            className="btn_2"
            onClick={() => setModal(account)}
          >
            {account.title}, {account.currency}
          </button>
        ))}
      </div>
    </>
  );
}
