import '../../assets/style/index.css';
import image_jumbotron_1 from '../../assets/images/jumbotron-aboutus.png'; // Sesuaikan dengan path gambar yang diupload

const JumbotronAbout = () => {
  return (
    <div className="jumbotron-image-container">
      <div className='absolute'>
        <h1 className='tentang-h1 font-inter'>TENTANG</h1>
        <h1 className='kami-h1 font-inter'>KAMI</h1>
      </div>
      <img src={image_jumbotron_1} alt="Tentang Kami" className="jumbotron-image" />
    </div>
  );
}

export default JumbotronAbout;
