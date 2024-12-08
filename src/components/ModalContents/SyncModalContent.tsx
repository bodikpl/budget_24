import { child, get, ref, remove, set } from "firebase/database";
import { DATABASE, RD_PROJECT_ITEMS } from "../../firebase";
import { useLocalStorage } from "usehooks-ts";
import { Account, Currency, Transaction } from "../../lib/types";
import { useState } from "react";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SyncModalContent({ setModal }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [localMainCurrency, setLocalMainCurrency] = useLocalStorage(
    "localMainCurrency",
    ""
  );
  const [localAccounts, setLocalAccounts] = useLocalStorage<Account[]>(
    "localAccounts",
    []
  );
  const [localCurrency, setLocalCurrency] = useLocalStorage<Currency[]>(
    "localCurrency",
    []
  );
  const [localTransactions, setLocalTransactions] = useLocalStorage<
    Transaction[]
  >("localTransactions", []);

  // CREATE
  const uploadToDatabase = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      set(ref(DATABASE, RD_PROJECT_ITEMS + "bodik"), {
        localMainCurrency,
        localAccounts,
        localCurrency,
        localTransactions,
      }).then(() => {
        setSuccess("Выгружено");
        setLoading(false);
        // setModal(false);
      });
    } catch (error) {
      console.log(error);
      setError("Error. Try later");
    }
  };

  // DOWNLOAD
  const downloadFromDatabase = () => {
    if (confirm("Восстановить? Текущие данные будут удалены!") === true) {
      setSuccess("");
      setError("");
      setLoading(true);
      try {
        const dbRef = ref(DATABASE);
        get(child(dbRef, `${RD_PROJECT_ITEMS}/bodik`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const result: {
                localMainCurrency: string;
                localAccounts: Account[];
                localCurrency: Currency[];
                localTransactions: Transaction[];
              } = snapshot.val();
              if (result.localMainCurrency) {
                setLocalMainCurrency(result.localMainCurrency);
              }
              if (result.localAccounts) {
                setLocalAccounts(result.localAccounts);
              }
              if (result.localCurrency) {
                setLocalCurrency(result.localCurrency);
              }
              if (result.localTransactions) {
                setLocalTransactions(result.localTransactions);
              }
              setSuccess("Загружено");
              window.location.reload();
            } else {
              setError("No data available");
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError(error);
          });
      } catch (error) {
        console.log(error);
        setError("Error. Try later");
      }
    }
  };

  const deleteUser = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    if (confirm(`Удалить?`) === true) {
      remove(ref(DATABASE, RD_PROJECT_ITEMS + "bodik"))
        .then(() => {
          setLoading(false);
          setSuccess("Данные на сервере удалены");
        })
        .catch((error) => {
          console.error("Error removing item:", error);
          setLoading(false);
          setError(error);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex gap-2 ">
        <button onClick={deleteUser} className="btn_2">
          Удалить все
        </button>

        <button onClick={downloadFromDatabase} className="btn_2">
          Восстановить
        </button>
      </div>

      <button
        onClick={uploadToDatabase}
        className="mt-4 py-2 w-full border-[#E64A19] border-[1.5px] font-medium text-[#E64A19] dark:text-white dark:border-white rounded-lg"
      >
        Сделать резервную копию
      </button>

      {error && <p className="mt-2">{error}</p>}
      {loading && <p className="mt-2">{loading}</p>}
      {success && <p className="mt-2">{success}</p>}
    </>
  );
}
