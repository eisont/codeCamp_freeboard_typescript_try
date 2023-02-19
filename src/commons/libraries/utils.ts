export const getDateComma = (date: string) => {
  const newdate = new Date(date);
  const yyyy = newdate.getFullYear();
  const mm = `${newdate.getMonth() + 1}`.padStart(2, String(0));
  const dd = `${newdate.getDate()}`.padStart(2, String(0));

  return `${yyyy}.${mm}.${dd}`;
};
