import Alert from "../common/Alert";
import DocumentItem from "./DocumentItem";

const DocumentList = (props) => {
  const { documents, openModal, handleToggleStatus } = props;

  return (
    <>
      {Array.isArray(documents) && documents.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-9 gap-y-8 mb-4">
          {documents.map((document) => (
            <DocumentItem
              key={document.id}
              {...document}
              openModal={openModal}
              handleToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada dokumen yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default DocumentList;
