import Image from "next/image";


const ShopGender = () => {
  let categories = [
    {
      id: 1,
      type: "WOMEN'S JEWELLERY",
      description: "Earrings, Pendants, Bracelets and more",
      image: <Image src={"/images/other/WomensGender.jpg"} alt="womengender" width={500} height={500}/>,
    },
    {
      id: 2,
      type: "MEN'S JEWELLERY",
      description: "Bracelets, Chains, Rings and more",
      image: <Image src={"/images/other/MensGender.jpg"} alt="mensgender" width={500} height={1000} />,
    },
    {
      id: 3,
      type: "KID'S JEWELLERY",
      description: "Anklets, Earrings, Bracelets and more",
      image: <Image src={"/images/other/KidsGender.jpg"} alt="kidsgender" width={500} height={1000} />,
    },
  ];

  return (
    <>
      <div className="w-full px-7 mt-24 text-rose-950">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-4xl text-2xl mt-3">SHOP BY GENDER</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-3 ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-2 relative items-center rounded-3xl blurcontainer"
            >
              <div className="rounded-[60px] overflow-hidden bg">
                {category.image}
                <div className="overlay">
                  {/* <h2>
                    Check This <span>Collection!</span>
                  </h2> */}
                  <p>{category.type}</p>
                </div>
              </div>

              <h1 className="text-xl font-semibold">{category.type}</h1>
              <p className="text-sm">{category.description}</p>
              <h3 className="text-red underline">View All</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopGender;



