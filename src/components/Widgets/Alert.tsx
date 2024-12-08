type ModalProps = {
  title: string;
  dascription: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

export default function Alert({
  title,
  dascription,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <div className="fixed flex items-center p-6 bg-black/50 backdrop-blur inset-0 z-10">
      <div className="bg-white dark:bg-neutral-700 dark:text-white p-4 rounded-xl max-w-lg mx-auto">
        <h3 className="text-center">{title}</h3>
        <p className="mt-2 text-neutral-500 dark:text-neutral-200 text-center">
          {dascription}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            className="btn_2 border border-[#EA4335] text-[#EA4335]"
            onClick={() => onConfirm()}
          >
            Подтвердить
          </button>
          <button className="btn_2" onClick={() => onClose(false)}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}
