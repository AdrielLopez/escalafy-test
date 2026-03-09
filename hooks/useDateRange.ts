import { useState, useCallback } from 'react';

export function useDateRange(initialStartDate: string, initialEndDate: string) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const updateDateRange = useCallback((newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }, []);

  return { startDate, endDate, updateDateRange };
}
