import Navbar from "../../components/guest/Navbar";
import ImageSlider from "../../components/guest/ImageSlider";
import JumbotronAbout from "../../components/guest/JumbotronAbout";

const About = () =>{
    return (
        <>
        <Navbar />
        {/* jumbotron */}
        <section className="jumbotron-about">
            <JumbotronAbout />
        </section>
        {/* row 1 */}
        <section className="visi-misi-row">
    
                <div className="container mx-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* <!-- Column 1: Text --> */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-950 mb-4">Mari mengenal <span className="text-amber-950">CV Slamet QuaiL Farm</span></h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                PT AMANTRA INVESTAMA INDODANA adalah perusahaan yang bergerak dibidang Layanan Urun Dana (Securities Crowdfunding) berbasis teknologi informasi dengan nama Platform Visiku.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Visiku hadir sebagai wadah untuk menghubungkan antara pemilik bisnis dalam sektor Usaha Mikro Kecil Menengah (UMKM) dengan Pemodal (Investor). Visiku memberikan solusi permodalan kepada Usaha Mikro Kecil Menengah (UMKM) di Indonesia, sehingga UMKM dapat lebih ekspansif dan berkembang.
                            </p>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">VISI:</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Visi kami adalah menjadi perusahaan penyedia jasa layanan urun dana berbasis teknologi informasi terbaik di Indonesia serta dapat mendorong kemajuan perekonomian UMKM di Indonesia.
                            </p>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">MISI:</h3>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                                <li>Memberikan solusi permodalan kepada Usaha Mikro Kecil Menengah (UMKM) di Indonesia</li>
                                <li>Membantu UMKM untuk lebih ekspansif dan berkembang</li>
                                <li>Memberikan pelayanan prima dengan konsep penerbit dan Pemodal</li>
                            </ul>
                        </div>
                        {/* <!-- Column 2: Image Slider --> */}
                        {/* <div className="swiper-container relative">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <img src="src/assets/images/Sukaharja Smart Quail Farm-1.png" alt="Slide 1" className="w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                                <div className="swiper-slide">
                                    <img src="src/assets/images/Sukaharja Smart Quail Farm-1 copy.png" alt="Slide 2" className="w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                                <div className="swiper-slide">
                                    <img src="src/assets/images/Sukaharja Smart Quail Farm-1 copy 2.png" alt="Slide 3" className="w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                                <div className="swiper-slide">
                                    <img src="src/assets/images/Sukaharja Smart Quail Farm-1 copy 3.png" alt="Slide 4" className="w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                            </div> */}
                            {/* <!-- Navigation buttons --> */}
                            {/* <button id="prevBtn" className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">‹</button>
                            <button id="nextBtn" className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">›</button>
                        </div> */}
                        <ImageSlider />
                    </div>
                </div>

        </section>
        
        <br />

        {/* row 2 */}
        <section>
        <div className="flex flex-row justify-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-950 mb-4">
                    Awal Mula Kami Berdiri
                </h1>
            </div>
        </div>
        <div className="flex flex-row justify-center  ml-10 ">
            <div>
                <h2 className="text-3xl font-thin text-gray-800 dark:text-gray-950 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h2>
            </div>
        </div>
        </section>
        </>
    );
};

export default About;