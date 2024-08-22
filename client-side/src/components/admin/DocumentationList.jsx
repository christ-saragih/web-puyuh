import DocumentationItem from "./DocumentationItem";

const DocumentationList = (props) => {
  const { documentations, openModal } = props;
  return (
    <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
     {documentations.map((documentation) => (
        <DocumentationItem key={documentation.id} {...documentation} openModal={openModal}/>
     ))}
    </div>
  );
};

export default DocumentationList;


