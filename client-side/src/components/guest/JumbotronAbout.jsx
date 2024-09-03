const JumbotronAbout = (props) => {
  const { abouts } = props;

  // Replace backslashes with forward slashes for URL
  const imagePath = abouts.tentangkami.image_background;

  // console.log('DATA:');
  
  // Menggabungkan URL dengan path gambar
  // const backgroundImageStyle = {
  //   backgroundImage: `url(http://localhost:3000/api/tentang-kami/image/${imagePath})`,
  // };
  // const backgroundImageStyle = `${imagePath}`;

  // Memisahkan kata-kata dalam judul
  const judulArray = abouts.tentangkami.judul.split(' ');

  return (
    <div className="relative">
      <img src={`http://localhost:3000/api/tentang-kami/image/${imagePath}`} alt={imagePath} className="object-cover w-full h-[26rem] rounded-br-[250px]" />
      <h1 className='absolute lg:top-[1.5rem] tentang-h1 font-inter font-bold text-[4rem] md:text-[7rem] text-[#A6513C] lg:px-24'>
        <span className='text-[4rem] lg:text-[6.5rem]'>{judulArray[0]}</span> <br />
        <span className='text-[5rem] lg:text-[12rem] leading-none'>{judulArray[1]}</span>
      </h1>
    </div>
  );
};

export default JumbotronAbout;
