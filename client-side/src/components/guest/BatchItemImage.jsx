const BatchItemImage = (props) => {
  const { gambar } = props;
  return (
    <div className="h-[7.5rem]">
      <img
        className="object-cover w-full h-full object-left-top"
        src={`http://localhost:3000/api/investasi/image/${gambar}`}
        alt={gambar}
      />
    </div>
  );
};

export default BatchItemImage;
