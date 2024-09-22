import { useState } from "react";
import { Calendar, Badge } from "rsuite";

// Komponen untuk menampilkan badge di tanggal yang ditandai
const HighlightedDateBadge = ({ date, markedDate }) => {
  const isMarked =
    markedDate &&
    date.getFullYear() === markedDate.getFullYear() &&
    date.getMonth() === markedDate.getMonth() &&
    date.getDate() === markedDate.getDate();

  return isMarked ? (
    <Badge className="absolute -right-0 -top-[25px] w-[10px] h-[10px] rounded-full bg-[#fc6a2f]" />
  ) : null;
};

const renderCell = (date, markedDate) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Menambahkan Badge jika tanggalnya sesuai */}
      <HighlightedDateBadge date={date} markedDate={markedDate} />
    </div>
  );
};

// Komponen Kalender Custom
const CalendarAdmin = ({ markedDate }) => {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      compact
      renderCell={(date) => renderCell(date, markedDate)}
      onChange={setDate}
      className="calendar-admin"
    />
  );
};

export default CalendarAdmin;
