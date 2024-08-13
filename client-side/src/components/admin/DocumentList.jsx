import DocumentItem from "./DocumentItem"

const DocumentList = () => {

    return (
        <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <DocumentItem key={i} />
            ))}
          </div>
    )
}

export default DocumentList;