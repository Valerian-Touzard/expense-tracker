import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export type FormData = {
  type: "expense" | "income";
  amount: number;
  description: string;
};

const GlobalState = ({ children }: React.PropsWithChildren) => {
  const [formData, setFormData] = useState<FormData>({
    type: "expense",
    amount: 0,
    description: "",
  });

  const [value, setValue] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransaction, setAllTransaction] = useState<FormData[]>([]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
