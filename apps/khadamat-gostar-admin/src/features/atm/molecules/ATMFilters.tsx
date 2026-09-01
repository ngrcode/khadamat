"use client";

import { SearchInput } from "@repo/ui/molecules/search-input";

import { useATMSearch } from "../model/ATMSearchProvider";

export function ATMFilters() {
  const { search, setSearch } = useATMSearch();

  return (
    <SearchInput
      value={search}
      placeholder="جست‌وجو بر اساس پایانه، شعبه یا موقعیت"
      onChange={setSearch}
      onSearch={setSearch}
    />
  );
}
