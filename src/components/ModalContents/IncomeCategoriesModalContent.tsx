import { INCOME_CATEGORIES } from "../../../data";

type IncomeCategoriesModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function IncomeCategoriesModalContent({
  setModal,
}: IncomeCategoriesModalContentProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {INCOME_CATEGORIES.map((ic) => (
          <button key={ic} className="btn_2">
            {ic}
          </button>
        ))}
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
