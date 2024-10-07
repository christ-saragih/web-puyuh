import React, { useState } from "react";
import { Calendar, Badge, Modal, Button } from "rsuite";
import 'rsuite/Calendar/styles/index.css';
import 'rsuite/Modal/styles/index.css';
import 'rsuite/Button/styles/index.css';

const HighlightedDateBadge = ({ date, markedDatesInfo }) => {
  const isMarked = markedDatesInfo.some(
    (markedDate) =>
      markedDate.date.getFullYear() === date.getFullYear() &&
      markedDate.date.getMonth() === date.getMonth() &&
      markedDate.date.getDate() === date.getDate()
  );

  return isMarked ? (
    <Badge className="absolute -right-0 -top-[25px] w-[10px] h-[10px] rounded-full bg-[#fc6a2f]" />
  ) : null;
};

const renderCell = (date, markedDatesInfo) => {
  return (
    <div style={{ position: "relative" }}>
      <HighlightedDateBadge date={date} markedDatesInfo={markedDatesInfo} />
    </div>
  );
};

const CalendarInvestor = ({ markedDatesInfo }) => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedInvestments, setSelectedInvestments] = useState([]);

  const handleSelect = (date) => {
    console.log("Date clicked:", date);
    setDate(date);
    
    const matchingInvestments = markedDatesInfo.filter(
      (investment) =>
        investment.date.getFullYear() === date.getFullYear() &&
        investment.date.getMonth() === date.getMonth() &&
        investment.date.getDate() === date.getDate()
    );

    if (matchingInvestments.length > 0) {
      setSelectedInvestments(matchingInvestments);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Calendar
        compact
        renderCell={(date) => renderCell(date, markedDatesInfo)}
        onSelect={handleSelect}
        value={date}
        className="calendar-investor -mb-7"
      />
      <Modal open={showModal} onClose={closeModal}>
        <Modal.Header>
          <Modal.Title>Tanggal Penutupan Investasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvestments.length > 0 ? (
            selectedInvestments.map((investment, index) => (
              <p key={index}>
                Tanggal {investment.date.toLocaleDateString()} adalah tanggal penutupan untuk <strong>{investment.batchTitle}</strong>.
              </p>
            ))
          ) : (
            <p>Tidak ada informasi investasi untuk tanggal ini.</p>
          )}
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