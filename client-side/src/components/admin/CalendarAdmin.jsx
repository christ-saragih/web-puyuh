import { useState } from "react";
import { Calendar, Badge } from "rsuite";
import 'rsuite/Calendar/styles/index.css';

// Komponen untuk menampilkan badge di tanggal yang ditandai
const HighlightedDateBadge = ({ date, markedDates }) => {
  const isMarked = markedDates.some(
    (markedDate) =>
      markedDate.getFullYear() === date.getFullYear() &&
      markedDate.getMonth() === date.getMonth() &&
      markedDate.getDate() === date.getDate()
  );

  return isMarked ? (
    <Badge className="absolute -right-0 -top-[25px] w-[10px] h-[10px] rounded-full bg-[#fc6a2f]" />
  ) : null;
};

// Fungsi untuk render setiap cell kalender
const renderCell = (date, markedDates) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Menambahkan Badge jika tanggalnya sesuai */}
      <HighlightedDateBadge date={date} markedDates={markedDates} />
    </div>
  );
};

// Komponen Kalender Custom
const CalendarAdmin = ({ markedDates }) => {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      compact
      renderCell={(date) => renderCell(date, markedDates)} // Gunakan array markedDates
      onChange={setDate}
      className="calendar-admin"
    />
  );
};

export default CalendarAdmin;
