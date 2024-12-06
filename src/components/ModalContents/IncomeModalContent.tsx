type IncomeModalContentProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function IncomeModalContent({
  setModal,
}: IncomeModalContentProps) {
  return (
    <>
      <button
        className="mt-4 ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10 disabled:hidden"
        onClick={() => setModal(false)}
      >
        Сохранить
      </button>
    </>
  );
}
