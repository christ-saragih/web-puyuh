import { useState } from "react";
import { Calendar, Badge, Modal, Button } from "rsuite";
import 'rsuite/Calendar/styles/index.css';
import 'rsuite/Modal/styles/index.css';
import 'rsuite/Button/styles/index.css';

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

const renderCell = (date, markedDates) => {
  return (
    <div style={{ position: "relative" }}>
      <HighlightedDateBadge date={date} markedDates={markedDates} />
    </div>
  );
};

const CalendarInvestor = ({ markedDates, onDateClick }) => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    console.log("Date clicked:", date);
    setDate(date);
    
    const isMarked = markedDates.some(
      (markedDate) =>
        markedDate.getFullYear() === date.getFullYear() &&
        markedDate.getMonth() === date.getMonth() &&
        markedDate.getDate() === date.getDate()
    );

    if (isMarked) {
      setSelectedDate(date);
      setShowModal(true);
    }

    onDateClick(date);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Calendar
        compact
        renderCell={(date) => renderCell(date, markedDates)}
        onSelect={handleSelect}
        value={date}
        className="calendar-investor -mb-7"
      />
      <Modal open={showModal} onClose={closeModal}>
        <Modal.Header>
          <Modal.Title>Tanggal Penutupan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tanggal {selectedDate?.toLocaleDateString()} adalah tanggal penutupan untuk investasi .
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} appearance="primary">
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CalendarInvestor;