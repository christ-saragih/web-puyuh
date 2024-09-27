import Alert from "../common/Alert";
import FaqAdminItem from "./FaqItem";

const FaqAdminList = (props) => {
  const { faqs, openModal, handleToggleStatus } = props;

  return (
    <>
      {Array.isArray(faqs) && faqs.length > 0 ? (
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
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada FAQ yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default FaqAdminList;
