import Image from "next/image";

const Appointment = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-5  text-rose-950">
        <div className="bg-secondary2 flex items-center justify-start lg:h-full md:h-full sm:h-full lg:py-0 md:py-0 sm:py-10">
          <div className="flex flex-col lg:py-0 md:py-0 sm:py-10 text-center items-start p-10 gap-3">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-red text-left mt-5">
              Visualize Your
              <br className="hidden sm:inline" />
              Perfect look!{" "}
            </h2>
            <div className="">
              <p className="font-medium text-red-950 text-left mb-4">
                Try Before you Buy:Experience the Elegance of Our Jewellery{" "}
                <br /> in the Comfort of your Home.Book an appoinment with us{" "}
                <br />
                today!
              </p>
              <h1 className="text-red-950 text-left font-bold">
                Gold Exchange
              </h1>
              <p className="font-medium text-red-950 text-left">
                Trade your previous gold items for newer, more exquisite{" "}
                <br className="hidden sm:inline" /> pieces that better suit your
                evolving style.
              </p>
            </div>
            <a href="/product-page">
              <button
                type="button"
                className="text-white bg-gradient-to-br bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20 "
              >
                Book Appointment
              </button>
            </a>
          </div>
        </div>
        <div className="justify-center items-center bg-red-700 grid grid-cols-2">
          {/* <img className="h-full w-full" src="/images/other/image135.png" alt="" />
          <img className="h-full w-full" src="/images/other/image136.png" alt="" /> */}
          <Image
            src={"/images/other/image135.png"}
            alt=""
            width={1000}
            height={699}
          />
          <Image
            src={"/images/other/image135.png"}
            alt=""
            width={500}
            height={699}
          />
        </div>
      </div>
    </>
  );
};

export default Appointment;
