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
          <h1 className="font-semibold text-[1.5rem] uppercase pb-2">GIFTS</h1>
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
              className="flex flex-col gap-2 relative"
            >
              <div className="effect10 img">
                {category.image} <a href="#">{category.type}</a>
              </div>
              {/* <h1 className="text-xl font-semibold">{category.type}</h1> */}
              <a className="inline-flex" >
                <span className="me-2 text-[#E26178] underline cursor-pointer text-sm">
                  View All
                </span>
                <span className="flex">
                  <Image
                    src={"/images/icons/rightarrow.svg"}
                    alt="Right Arrow"
                    width={20}
                    height={20}
                  />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gifts;
