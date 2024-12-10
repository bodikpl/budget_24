import { useLocalStorage } from "usehooks-ts";

type TotalCardProps = {
  title: string;
  color: string;
  amount: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TotalCard({
  title,
  color,
  amount,
  setModal,
}: TotalCardProps) {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");

  return (
    <div
      style={{ backgroundColor: color }}
      className="rounded-lg p-3 pb-2 w-full flex justify-between items-start relative dark:text-black dark:saturate-[900%]"
    >
      <div>
        <p className="font-aptosSemiBold text-sm">{title}</p>
        <p className="mt-4 text-xl font-aptosBold">
          {amount.toFixed(1)}{" "}
          <span className="font-aptosSemiBold text-lg">
            {localMainCurrency}
          </span>
        </p>
      </div>
      <button
        className="btn_1 absolute top-2 right-2"
        onClick={() => setModal(true)}
      >
        +
      </button>
    </div>
  );
}
