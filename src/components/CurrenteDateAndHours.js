const currentDate = () => {
  const currentDay = new Date();
  const day = String(currentDay.getDate()).padStart(2, '0');
  const month = String(currentDay.getMonth() + 1).padStart(2, '0');
  const year = currentDay.getFullYear();
  
  const formattedDay = `${day}-${month}-${year}`;

  return formattedDay;
}

const currentHours = () => {
  const currentDay = new Date();
  const hours = String(currentDay.getHours()).padStart(2, '0');
  const minutes = String(currentDay.getMinutes()).padStart(2, '0');
  const seconds = String(currentDay.getSeconds()).padStart(2, '0');
  const currentHours = `${hours}:${minutes}:${seconds}`;

  return currentHours;
}

export {
  currentDate,
  currentHours
};
