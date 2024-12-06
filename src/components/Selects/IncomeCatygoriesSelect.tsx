import { INCOME_CATEGORIES } from "../../lib/data";

type IncomeCatygoriesSelectProps = {
  setModal: (value: string) => void;
};

export default function IncomeCatygoriesSelect({
  setModal,
}: IncomeCatygoriesSelectProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {INCOME_CATEGORIES.map((ic) => (
          <button key={ic} className="btn_2" onClick={() => setModal(ic)}>
            {ic}
          </button>
        ))}
      </div>
    </>
  );
}
