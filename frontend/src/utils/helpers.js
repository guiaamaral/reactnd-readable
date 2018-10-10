export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1);
}

export function humanLink(str = '') {
  return typeof str !== 'string'
    ? ''
    : str.replace(/ /g,'-').replace(/[^a-zA-Z0-9-. ]/g,'').toLowerCase();
}

export function timestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year    = date.getFullYear();
  const months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month   = months[date.getMonth()];
  const day     = date.getDay();
  return month +' '+ day +', '+ year;
}