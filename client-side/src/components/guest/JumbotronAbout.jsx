const JumbotronAbout = (props) => {
  const { abouts } = props;

  // Replace backslashes with forward slashes for URL
  const imagePath = abouts.tentangkami[0].image_background.replace(/\\/g, '/');
  // console.log("Background image: ");
  // console.log(imagePath);
  
  // // Menggabungkan URL dengan path gambar
  const backgroundImageStyle = {
    backgroundImage: `url(http://localhost:3000/api/tentang-kami/images/${imagePath})`,
  };

  // console.log(backgroundImageStyle);

  return (
    <div
    className="bg-cover bg-center w-full h-full rounded-br-[250px] md:px-20 md:py-20 px-10 py-16"
    style={backgroundImageStyle}
    >
      <h1 className='tentang-h1 font-inter -mb-14 font-bold text-[4rem] md:text-[7rem] md:-mb-16 text-[#A6513C]'>{abouts.tentangkami[0].judul}</h1>
      {/* <img src={`http://localhost:3000/api/tentang-kami/images/${imagePath}`} alt="" /> */}
      {/* <h1 className='kami-h1 font-inter font-bold text-[8rem] ml-2 md:text-[12.8rem] md:-mb-28 text-[#A6513C]'>KAMI</h1> */}
    </div>
  );
};

export default JumbotronAbout;
