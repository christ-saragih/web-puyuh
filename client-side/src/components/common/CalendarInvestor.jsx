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
      <HighlightedDateBadge date={date} markedDates={markedDates} />
    </div>
  );
};

// Komponen Kalender Custom
const CalendarInvestor = ({ markedDates, onDateClick }) => {
  const [date, setDate] = useState(new Date());

  const handleSelect = (date) => {
    console.log("Date clicked:", date);
    setDate(date);
    onDateClick(date);
  };

  return (
    <Calendar
      compact
      renderCell={(date) => renderCell(date, markedDates)}
      onSelect={handleSelect}
      value={date}
      className="calendar-investor -mb-7"
    />
  );
};

export default CalendarInvestor;
