import { useState, useCallback } from 'react';

export function useDateRange(initialStartDate: string, initialEndDate: string) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const updateDateRange = useCallback((newStartDate: string, newEndDate: string) => {
    // Prevent invalid ranges where end date is earlier than start date.
    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      return;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }, []);

  return { startDate, endDate, updateDateRange };
}
