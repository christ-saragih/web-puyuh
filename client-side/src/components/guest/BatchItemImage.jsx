
const BatchItemImage = (props) => {
  const { gambar } = props;
  return (
    <div className="h-48">
      <img
        className="object-cover w-full h-full object-left-top"
        src={gambar}
      />
    </div>
  );
};

export default BatchItemImage;
