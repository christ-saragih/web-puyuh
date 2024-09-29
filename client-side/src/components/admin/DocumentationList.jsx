import Alert from "../common/Alert";
import DocumentationItem from "./DocumentationItem";

const DocumentationList = (props) => {
  const { documentations, openModal } = props;

  return (
    <>
      {Array.isArray(documentations) && documentations.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
          {documentations.map((documentation) => (
            <DocumentationItem
              key={documentation.id}
              {...documentation}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert
            message={"Tidak ada dokumentasi yang tersedia."}
            type={"info"}
          />
        </div>
      )}
    </>
  );
};

export default DocumentationList;
