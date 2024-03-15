import { createContext } from "react";

export const GlobalContext = createContext(null);

const GlobalState = ({children}: React.PropsWithChildren) => {
  return (
    <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
  )
}

export default GlobalState