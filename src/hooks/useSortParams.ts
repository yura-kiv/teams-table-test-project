import { useState } from "react";
import { Order } from "../models/sorting.models";

interface SortParams<T> {
  key: T | null;
  order: Order | null;
}

interface UseSortParams<T> {
  sortParams: SortParams<T>;
  handleSort: (clickedKey: T) => void;
}

function useSortParams<T>(): UseSortParams<T> {
  const [sortParams, setSortParams] = useState<SortParams<T>>({ key: null, order: null });

  const handleSort = (clickedKey: T) => {
    if (sortParams.key === clickedKey) {
      if (sortParams.order === Order.Asc) {
        setSortParams({ key: clickedKey, order: Order.Desc });
      } else {
        setSortParams({ key: null, order: null });
      }
    } else {
      setSortParams({ key: clickedKey, order: Order.Asc });
    }
  };

  return {
    sortParams,
    handleSort,
  };
}

export default useSortParams;
