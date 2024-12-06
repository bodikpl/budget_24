import { Account } from "../../lib/types";

type AccountModalContentProps = {
  account: Account;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountModalContent({
  account,
  setModal,
}: AccountModalContentProps) {
  return (
    <>
      <div>
        <p>
          {account.title}, <span>{account.currency}</span>
        </p>
        <p className="text-base font-aptosBold">
          {account.balance} <span className="text-xs">{account.currency}</span>
        </p>
      </div>

      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => setModal(false)}
      >
        Сохранить
      </button>
    </>
  );
}
