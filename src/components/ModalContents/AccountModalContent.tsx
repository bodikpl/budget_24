import { useLocalStorage } from "usehooks-ts";
import { Account } from "../../lib/types";

type AccountModalContentProps = {
  account: Account;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountModalContent({
  account,
  setModal,
}: AccountModalContentProps) {
  const [localAccounts, setLocalAccounts] = useLocalStorage<Account[]>(
    "localAccounts",
    []
  );

  const handleDeleteAccount = (id: string) => {
    const filteredLocalAccounts = localAccounts.filter((acc) => acc.id !== id);
    setLocalAccounts(filteredLocalAccounts);
  };

  return (
    <>
      <div>
        <p>
          {account.title}, <span>{account.currency}</span>
        </p>
        <p className="text-base font-aptosBold">
          Начальная сумма {account.initialBalance}{" "}
          <span className="text-xs">{account.currency}</span>
        </p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          className="ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
          onClick={() => {
            handleDeleteAccount(account.id);
            setModal(false);
          }}
        >
          Удалить
        </button>
        <button
          className="block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
          onClick={() => setModal(false)}
        >
          Сохранить
        </button>
      </div>
    </>
  );
}
