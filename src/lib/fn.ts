export const getFormattedDate = (date: number) => {
  const editedDate = new Date(date);
  const day = String(editedDate.getDate()).padStart(2, "0"); // День (с ведущим нулем)
  const month = String(editedDate.getMonth() + 1).padStart(2, "0"); // Месяц (нумерация с 0)
  // const year = date.getFullYear(); // Год
  const formattedDate = `${day}.${month}`;
  return formattedDate;
};
