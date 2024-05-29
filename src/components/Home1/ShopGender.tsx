import Image from "next/image";
import Link from "next/link";
import { useCategory } from "@/context/CategoryContex";
const ShopGender = () => {
  const {setCustomcategory}=useCategory()
  let categories = [
    {
      id: 1,
      url:"women",
      type: "WOMEN'S JEWELLERY",
      description: "Earrings, Pendants, Bracelets and more",
      image: <Image src={"/images/other/WomensGender.jpg"} alt="womengender" width={500} height={500}/>,
    },
    {
      id: 2,
      url:"men",
      type: "MEN'S JEWELLERY",

      description: "Bracelets, Chains, Rings and more",
      image: <Image src={"/images/other/MensGender.jpg"} alt="mensgender" width={500} height={1000} />,
    },
    {
      id: 3,
      url:"kids",
      type: "KID'S JEWELLERY",
      description: "Anklets, Earrings, Bracelets and more",
      image: <Image src={"/images/other/KidsGender.jpg"} alt="kidsgender" width={500} height={1000} />,
    },
  ];

  return (
    <>
      <div className="w-full px-7 mt-4 font-[500] text-[#39161C] mb-9">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-2xl mt-3">SHOP BY GENDER</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-3 ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-2 relative items-center rounded-3xl blurcontainer"
            >
              <Link href={`/products?url=${category.url}`} onClick={()=>setCustomcategory(category.url)}>
              <div className="rounded-[60px] overflow-hidden bg">
                {category.image}
                <div className="overlay">
                  <p className="text-2xl text-center">{category.type}</p>
                </div>
              </div></Link>

              <h1 className="text-xl font-semibold">{category.type}</h1>
              <p className="text-sm ">{category.description}</p>
              <Link href={`/products?url=${category.url}`} onClick={()=>setCustomcategory(category.url)}>
              <h3 className="text-red-700 font-bold underline">VIEW ALL</h3></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopGender;



