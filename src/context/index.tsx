import { createContext, useContext, useEffect, useState } from "react";
import { transactionService } from "../services/transactionService";

// Le type de tretour pour le context
type GlobalContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  totalExpense: number;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  totalIncome: number;
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
  allTransaction: FormData[];
  setAllTransaction: React.Dispatch<React.SetStateAction<FormData[]>>;
  formData: FormulaireTransaction,
  setFormData: React.Dispatch<React.SetStateAction<FormulaireTransaction>>;
  handleFormSubmit: () => void,
  getAllTransaction: () => void
};

export type FormData = {
  id: number
  type: "expense" | "income";
  amount: string;
  description: string;
};

export type FormulaireTransaction = {
  type: "expense" | "income";
  amount: string;
  description: string;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalState = ({ children }: React.PropsWithChildren) => {
  // état qui contient l'objet créer dans le formulaire
  const [formData, setFormData] = useState<FormulaireTransaction>({
    type: "expense",
    amount: "0",
    description: "",
  });
  const [value, setValue] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransaction, setAllTransaction] = useState<FormData[]>([]);

  useEffect(() => {
    getAllTransaction()
  },[])

  /**
   * Permet de récupérer, via le service, l'ensemble des transactions stocker en bdd
   */
  const getAllTransaction = () =>{
    transactionService.getAllTransactions().then(data => setAllTransaction(data));
  }

  /**
   * Permet d'enregistrer en bdd, une nouvelle transaction, via le service
   * @returns unknow
   */
  const handleFormSubmit = () => {
    if (!formData.description || !formData.amount) return;

    transactionService.AddTransaction(formData);
    getAllTransaction()
  };

  return (
    <GlobalContext.Provider
      value={{
        value,
        setValue,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        allTransaction,
        setAllTransaction,
        formData,
        setFormData,
        handleFormSubmit,
        getAllTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte dans les composants enfants
export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
