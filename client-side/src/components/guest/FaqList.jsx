import React, { useState } from "react";
import FaqItem from "./FaqItem";

const FaqList = (props) => {
  const { faqs } = props;

  console.log(faqs);
  

  const [openQuestionId, setOpenQuestionId] = useState(1);

  const handleToggle = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="accordion-group" data-accordion="default-accordion">
      {faqs.map((faq) => (
        <FaqItem
          key={faq.id}
          {...faq}
          isOpen={openQuestionId === faq.id}
          onToggle={() => handleToggle(faq.id)}
        />
      ))}
    </div>
  );
};

export default FaqList;
