// utils/formatDate.js
export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }
  