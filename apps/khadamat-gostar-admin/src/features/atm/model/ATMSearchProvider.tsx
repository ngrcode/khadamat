"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ATMSearchState = {
  search: string;
  setSearch: (value: string) => void;
};

const ATMSearchContext = createContext<ATMSearchState | null>(null);

export function ATMSearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  return (
    <ATMSearchContext.Provider value={{ search, setSearch }}>
      {children}
    </ATMSearchContext.Provider>
  );
}

export function useATMSearch() {
  const state = useContext(ATMSearchContext);
  if (!state)
    throw new Error("useATMSearch must be used within ATMSearchProvider");
  return state;
}
