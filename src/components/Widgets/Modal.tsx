type ModalProps = {
  title: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  node?: React.ReactNode;
  subModal?: boolean;
};

export default function Modal({ title, setModal, node, subModal }: ModalProps) {
  return (
    <div className="fixed p-4 bg-black/50 backdrop-blur inset-0 z-10">
      <div
        className={`${
          subModal && "mt-2 mx-2"
        } bg-white dark:bg-neutral-800 dark:ring-2 dark:ring-neutral-700 dark:text-white p-4 rounded-xl max-w-lg mx-auto`}
      >
        <div className="flex gap-4 justify-between items-start">
          <h3>{title}</h3>
          <button
            className="btn_1 dark:!bg-black rotate-45"
            onClick={() => setModal(false)}
          >
            +
          </button>
        </div>

        <div className="pt-4">{node}</div>
      </div>
    </div>
  );
}
