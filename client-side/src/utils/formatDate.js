export function formatDate(isoDate) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
}