export const startOfWeek = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const dayOfWeek = date.getDay();
  // sunday -> 0
  if (!dayOfWeek) return result;

  result.setDate(date.getDate() - dayOfWeek);
  return result;
};

export const startOfMonth = (date) => {
  const result = new Date(date);

  result.setDate(1);
  result.setHours(0, 0, 0, 0);

  return result;
};

export const endOfMonth = (date) => {
  const result = startOfMonth(date);

  // add to next month
  result.setMonth(result.getMonth() + 1);
  // set to yesterday of the first day of next month
  result.setDate(result.getDate() - 1);

  return result;
};

export const getWeeksInMonth = (date) => {
  const currentEOM = endOfMonth(date);
  const currentSOM = startOfMonth(date);
  const diff = currentSOM.getDay();
  return Math.ceil((currentEOM.getDate() + diff) / 7);
};

export const customSetDay = (date, num) => {
  const result = new Date(date);
  result.setDate(result.getDate() + num);
  return result;
};

export const customSetMonth = (date, num, target) => {
  const result = new Date(date);
  const diff = target || result.getMonth() + num;
  result.setMonth(diff);

  const currentTarget = diff < 0 ? 12 + diff : diff % 12;
  if (result.getMonth() !== currentTarget)
    return customSetMonth(result, undefined, currentTarget);
  return target ? endOfMonth(result) : result;
};

export const isSameMonth = (date1, date2) => {
  return date1.getMonth() === date2.getMonth();
};

export const customDateFormat = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
