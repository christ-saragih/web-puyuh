import DocumentItem from "./DocumentItem";

const DocumentList = (props) => {
  const { documents, openModal, handleToggleStatus } = props;

  return (
    <div className="grid grid-cols-3 gap-x-9 gap-y-8 mb-4">
      {documents.map((document) => (
        <DocumentItem key={document.id} {...document} openModal={openModal} handleToggleStatus={handleToggleStatus} />
      ))}
    </div>
  );
};

export default DocumentList;
