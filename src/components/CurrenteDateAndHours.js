const currentDate = () => {
  const currentDay = new Date();
  const day = String(currentDay.getDate()).padStart(2, '0');
  const month = String(currentDay.getMonth() + 1).padStart(2, '0');
  const year = currentDay.getFullYear();
  
  const formatedDay = `${day}-${month}-${year}`;

  return formatedDay;
}

const currentHours = () => {
  const currentDay = new Date();
  const currentHours = currentDay.toLocaleTimeString('pt-BR');

  return currentHours;
}

export {
  currentDate,
  currentHours
};