import { createContext, useContext, useState } from "react";

type GlobalContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  totalExpense: number;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  totalIncome: number;
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
  allTransaction: StoreFormData[];
  setAllTransaction: React.Dispatch<React.SetStateAction<StoreFormData[]>>;
  handleFormSubmit: () => void;
};

export type FormData = {
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
  const [formData, setFormData] = useState<FormData>({
    type: "expense",
    amount: "0",
    description: "",
  });
  const [value, setValue] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransaction, setAllTransaction] = useState<StoreFormData[]>([]);

  const handleFormSubmit = () => {
    if (!formData.description || !formData.amount) return;

    setAllTransaction([
      ...allTransaction,
      { transaction: formData, id: Date.now() },
    ]);
  };

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        value,
        setValue,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        allTransaction,
        setAllTransaction,
        handleFormSubmit,
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
