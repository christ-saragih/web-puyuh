import FaqList from "../../components/guest/FaqList";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import { getFaqData } from "../../utils/faqData";

const Faq = () => {
  const faqs = getFaqData();
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-32">
        <div className="flex flex-col justify-center items-center gap-x-14 gap-y-5 xl:gap-16 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ tailwind section"
              className="w-full rounded-xl"
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
    </>
  );
};

export default Faq;
