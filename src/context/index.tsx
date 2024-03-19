import { createContext, useContext, useEffect, useState } from "react";
import { transactionService } from "../services/transactionService";

type GlobalContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  totalExpense: number;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  totalIncome: number;
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
  allTransaction: FormData[];
  setAllTransaction: React.Dispatch<React.SetStateAction<FormData[]>>;
};

export type FormData = {
  id: number
  type: "expense" | "income";
  amount: string;
  description: string;
};

export type StoreFormData = {
  id: number;
  transaction: FormData;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalState = ({ children }: React.PropsWithChildren) => {
  const [value, setValue] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransaction, setAllTransaction] = useState<FormData[]>([]);

  useEffect(() => {
    getAllTransaction()
  },[])

  const getAllTransaction = () =>{
    transactionService.getAllTransactions().then(data => setAllTransaction(data));
    console.log(allTransaction)
  }

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
        setAllTransaction
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
