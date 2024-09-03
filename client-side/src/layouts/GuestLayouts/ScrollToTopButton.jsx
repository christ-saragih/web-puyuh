import { useState, useEffect } from "react";
import { PiCaretDoubleUpBold } from "react-icons/pi";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 80) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 sm:bottom-5 right-4 p-3 bg-[#4B241A] text-white rounded-full shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] hover:bg-[#381d15] hover:bottom-[100px] sm:hover:bottom-6 transition-all ease-in-out duration-300"
      >
        <PiCaretDoubleUpBold size={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
