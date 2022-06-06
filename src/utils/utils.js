/* export const getCookie = key =>
document.cookie.split('; ').reduce((total, currentCookie) => {
  const item = currentCookie.split('=');
  const storedKey = item[0];
  const storedValue = item[1];
  return key === storedKey 
    ? decodeURIComponent(storedValue) 
    : total;
},''); */

export const handleValidateNumbers = (e) => {
  let newValueInput = e.target.value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (newValueInput === '') {
    e.target.value = '0';
  } else {
    e.target.value = newValueInput;
  }
}

export const roundAndAddDigits = (num) => {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const addDigits = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const convertArrayToNumbers = (Array) => {
  for (let key in Array) {
    if (typeof Array[key] !== 'number') {
      if (key !== 'goal') {
        Array[key] = Number(Array[key].replace(/\s+/g, ''));
      }
    }
  }
}