/* eslint-disable import/prefer-default-export */
const getYMD = (receivedDate) => {
  let day = receivedDate.getDate();
  let month = receivedDate.getMonth() + 1;
  const year = receivedDate.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${year}-${month}-${day}`;
};

export { getYMD };
