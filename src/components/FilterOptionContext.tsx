import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { FilterOptions } from './MainContainerData';

interface FilterContextProps {
  filterOptions: FilterOptions;
  setFilterOptions: (filterOptions: FilterOptions) => void;
  resetFilters: boolean;
  setResetFilters: (reset: boolean) => void;
}

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FunctionComponent<FilterProviderProps> = ({ children }) => {
  const defaultFilterOptions: FilterOptions = {
    brandIds: [],
    uprLmt: 15000,
    lwrLmt: 0,
    productTypeId: 0,
    productionYear: 0,
    sortBy: "NAME",
    sortOrder: "ASC"
  };

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [resetFilters, setResetFilters] = useState<boolean>(false);

  const updateFilterOptions = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  useEffect(() => {
    if (resetFilters) {
      setFilterOptions(defaultFilterOptions);
      setResetFilters(false);
    }
  }, [resetFilters]);

  return (
    <FilterContext.Provider value={{ filterOptions, setFilterOptions: updateFilterOptions, resetFilters, setResetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};