type CategoriesSelectProps = {
  categories: string[];
  setModal: (value: string) => void;
};

export default function CategoriesSelect({
  categories,
  setModal,
}: CategoriesSelectProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <button key={cat} className="btn_2" onClick={() => setModal(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}
