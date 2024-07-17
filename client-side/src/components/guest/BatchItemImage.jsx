
const BatchItemImage = (props) => {
  const { imageUrl, alt } = props;
  return (
    <div className="h-48">
      <img
        className="object-cover w-full h-full object-left-top"
        src={imageUrl}
        alt={alt}
      />
    </div>
  );
};

export default BatchItemImage;
