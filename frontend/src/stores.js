import { useLocalObservable } from "mobx-react-lite";
import { createContext, useContext } from "react";
import rootStore from "./stores/index";

const storeContext = createContext(rootStore);

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => rootStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
