export const getCookie = key =>
document.cookie.split("; ").reduce((total, currentCookie) => {
  const item = currentCookie.split("=");
  const storedKey = item[0];
  const storedValue = item[1];
  return key === storedKey 
    ? decodeURIComponent(storedValue) 
    : total;
},'');

export const handleValidateNumbers = (e) => {
  let newValueInput = e.target.value.replace(/^0+/, '').replace(/[^\d]/g, '').replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (newValueInput === '') {
    e.target.value = '0';
  } else {
    e.target.value = newValueInput;
  }
}