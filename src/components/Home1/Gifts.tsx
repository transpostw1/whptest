import React from "react";
import Image from "next/image";

const Gifts = () => {
  let categories = [
    {
      id: 1,
      type: "HOUSE WARMING",
      image: (
        <Image
          src={"/images/other/Housewarming.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 2,
      type: "NEW BORN BABY",
      image: (
        <Image
          src={"/images/other/Newborn.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 3,
      type: "HER BIRTHDAY",
      image: (
        <Image
          src={"/images/other/Herbdy.jpg"}
          alt=""
          height={400}
          width={400}
        />
      ),
    },
    {
      id: 4,
      type: "HIS BIRTHDAY",
      image: (
        <Image
          src={"/images/other/Hisbdy.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 5,
      type: "CONGRATULATIONS",
      image: (
        <Image
          src={"/images/other/Congratulations.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 6,
      type: "GET WELL SOON",
      image: (
        <Image
          src={"/images/other/Getwell.jpg"}
          alt=" "
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 7,
      type: "THANK YOU",
      image: (
        <Image
          src={"/images/other/Thankyou.jpg"}
          alt=""
          width={400}
          height={400}
        />
      ),
    },
    {
      id: 8,
      type: "VALENTINES",
      image: <Image src={"/images/other/Valentines.jpg"} alt="" width={400} height={400} />,
    },
  ];

  return (
    <>
      <div className="w-full px-8 my-16  text-rose-950">
        <div className="flex flex-col items-start justify-between">
          <h1 className="lg:text-4xl text-2xl mt-3">GIFTS</h1>
          <p>
            Discover the joy of gifting with our curated selection,where every
            piece reflects <br />
            thoughtfulness and timeless charm, making evey occasion extra
            special.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-2 relative items-center"
            >
              <div className="effect12 img">
                {category.image} <a href="#">{category.type}</a>
              </div>
              {/* <h1 className="text-xl font-semibold">{category.type}</h1> */}
              <h3 className="text-red-700 font-bold underline text-center cursor-pointer">VIEW ALL</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gifts;
