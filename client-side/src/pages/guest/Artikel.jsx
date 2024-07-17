import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";

const Artikel = () => {
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <p>Halaman Artikel!</p>
      </GuestLayout>
    </>
  );
};

export default Artikel;
