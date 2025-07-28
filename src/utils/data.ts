export const isDateAfter = (date1: string, date2: string) => {
  if (!date1 || !date2) return true;

  return new Date(date1) > new Date(date2);
};

export const isDateAfterOrEqual = (date1: string, date2: string) => {
  if (!date1 || !date2) return true;

  return new Date(date1) >= new Date(date2);
};
