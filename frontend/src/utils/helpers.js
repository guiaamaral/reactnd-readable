export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1);
}

export function timestampToDate(timestamp) {
  const date    = new Date(timestamp);
  const year    = date.getFullYear();
  const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month   = months[date.getMonth()];
  const day     = date.getDate();
  return month +' '+ day +', '+ year;
}

export function uuid() {
  return Math.random().toString(36).substr(-8) + Math.random().toString(36).substr(-8);
}