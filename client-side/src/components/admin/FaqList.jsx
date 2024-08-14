import FaqAdminItem from "./FaqItem";

const FaqAdminList = (props) => {
    const { faqs, openModal } = props;

    return (
        <div className="grid grid-cols-2 gap-x-9 gap-y-8 mb-4">
            {faqs.map((faq) => (
                <FaqAdminItem key={faq.id} {...faq} openModal={openModal} />
            ))}
        </div>
    );
}

export default FaqAdminList;