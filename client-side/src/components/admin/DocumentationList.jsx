import DocumentationItem from "./DocumentationItem";

const DocumentationList = (props) => {
  const { documentations } = props;
  return (
    <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
     {documentations.map((documentation) => (
        <DocumentationItem key={documentation.id} {...documentation} />
     ))}
    </div>
  );
};

export default DocumentationList;


