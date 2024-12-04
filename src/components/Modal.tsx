type ModalProps = {
  title: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  node?: React.ReactNode;
};

export default function Modal({ title, setModal, node }: ModalProps) {
  return (
    <div className="fixed p-4 bg-black/50 backdrop-blur inset-0 z-10">
      <div className="bg-white p-4 rounded-xl max-w-lg mx-auto">
        <div className="flex gap-4 justify-between items-start">
          <h3>{title}</h3>
          <button className="btn_1 rotate-45" onClick={() => setModal(false)}>
            +
          </button>
        </div>

        <div className="py-4">{node}</div>

        <button
          className="ml-auto block bg-black/5 aspect-square px-4 h-10 rounded-lg leading-none transition-colors hover:bg-black/10"
          onClick={() => setModal(false)}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
