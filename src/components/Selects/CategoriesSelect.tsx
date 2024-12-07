type CategoriesSelectProps = {
  categories: string[];
  setModal?: (value: string) => void;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoriesSelect({
  categories,
  setModal,
  onClose,
}: CategoriesSelectProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className="btn_2"
            onClick={() => {
              if (setModal) {
                setModal(cat);
              }
              if (onClose) {
                onClose(false);
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}
