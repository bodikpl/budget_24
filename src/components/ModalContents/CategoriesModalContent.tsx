import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from "../../lib/data";

type CategoriesModalContentProps = {
  categoriesType: "income" | "expense";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoriesModalContent({
  categoriesType,
  setModal,
}: CategoriesModalContentProps) {
  const categories =
    categoriesType === "income" ? INCOME_CATEGORIES : EXPENSES_CATEGORIES;
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button key={category} className="btn_2">
            {category}
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
