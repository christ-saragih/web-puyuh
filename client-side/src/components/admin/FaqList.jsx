import FaqAdminItem from "./FaqItem";

const FaqAdminList = (props) => {
  const { faqs, openModal, handleToggleStatus } = props;

  return (
    <div className="grid grid-cols-2 gap-x-9 gap-y-8 mb-4">
      {faqs.map((faq) => (
        <FaqAdminItem
          key={faq.id}
          {...faq}
          openModal={openModal}
          handleToggleStatus={handleToggleStatus}
        />
      ))}
    </div>
  );
};

export default FaqAdminList;
