import { useEffect, useState } from "react";
import FaqList from "../../components/guest/FaqList";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import { getFaqs } from "../../services/faq.service";
import Footer from "../../components/guest/Footer";
import FaqImage from "../../assets/images/faq-image.png";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getFaqs((data) => {
      setFaqs(data);
    });
  }, []);

  // const fetchFaqs = async () => {
  //   try {
  //     const faqsResponse = await axiosInstance.get("/faq");
  //     setFaqs(faqsResponse.data);
  //     console.log(faqsResponse.data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchFaqs();
  // }, [])

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-36">
        <div className="flex flex-col justify-center items-center gap-x-14 gap-y-5 xl:gap-16 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src={FaqImage}
              alt=""
              className="w-full rounded-xl shadow-md"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] lg:text-left">
                  Frequently asked questions
                </h2>
                <h6 className="text-lg text-center font-medium text-[#4B241A] mb-2 lg:text-left">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </h6>
              </div>

              <FaqList faqs={faqs} />
            </div>
          </div>
        </div>
      </GuestLayout>

      <Footer />
    </>
  );
};

export default Faq;
