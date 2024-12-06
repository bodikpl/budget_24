import { useLocalStorage } from "usehooks-ts";

function TotalCard({
  title,
  color,
  amount,
  setModal,
}: {
  title: string;
  color: string;
  amount: number | string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [localMainCurrency] = useLocalStorage("localMainCurrency", "");
  return (
    <div
      style={{ backgroundColor: color }}
      className="rounded-lg p-3 pb-2 w-full flex justify-between items-start relative"
    >
      <div>
        <p className="font-aptosSemiBold text-sm">{title}</p>
        <p className="mt-4 text-xl font-aptosBold">
          {amount}{" "}
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
export default TotalCard;
