import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCategory } from "@/context/CategoryContex";

const Extendedfooter = () => {
  const { category, setCustomcategory } = useCategory();
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = (url: string, title: string) => {
    const formattedValue = url.replace(/ /g, "_");
    const value2 = formattedValue.toLowerCase();
    if (
      value2 == "earrings" ||
      value2 == "ring" ||
      value2 == "mangalsutra" ||
      value2 == "pendants" ||
      value2 == "bangle" ||
      value2 == "bracelet" ||
      value2 == "necklace"  
    ) {
      router.push(`/products?url=category-${value2}`);
    } else {
      router.push(`/products?url=search-${value2}`);
    }
    setCustomcategory(title);
  };
  if (pathname === "/checkout") return null;

  return (
    <div className="px-7 py-10">
      <h1 className="mb-4 font-semibold">Popular Searches</h1>

      <div className="border-line border-b py-4">
        <h1 className="font-semibold">For Women</h1>
        <h1>
          <span
            onClick={() => {
              setCustomcategory(`Rings`);
              router.push(`/products?url=pc-rings`);
            }}
            className="cursor-pointer"
          >
            Rings For Women 
          </span>
          |{" "}
          <span
          onClick={() => {
              setCustomcategory(`Earrings`);
              router.push(`/products?url=pc-earrings`);
            }}
            className="cursor-pointer"
          >
            Earrings For Women
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("bracelet for women", "Bracelets for women")
            }
            className="cursor-pointer"
          >
            Bracelets For Women
          </span>
          |
          <span
            onClick={() =>
              handleNavigation("bangles", "Bangles for women")
            }
            className="cursor-pointer"
          >
            Bangles For Women
          </span>{" "}
          |
          <span
            onClick={() =>
              handleNavigation("pendant for women", "Pendants for women")
            }
            className="cursor-pointer"
          >
            Pendants For Women
          </span>
          |
          <span
            onClick={() =>
              handleNavigation("necklace", "Necklaces for women")
            }
            className="cursor-pointer"
          >
            Necklaces For Women
          </span>
        </h1>
      </div>

      <div className="border-line border-b py-4">
        <h1 className="font-semibold">For Men</h1>
        <h1>
          <span
            onClick={() => handleNavigation("ring for men", "Rings for men")}
            className="cursor-pointer"
          >
            Rings For Men
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("earrings men", "Earrings for men")
            }
            className="cursor-pointer"
          >
            Earrings For Men
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("bracelet for men", "Bracelet for men")}
            className="cursor-pointer"
          >
            Bracelets For Men
          </span>{" "}
          |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
              Men's Kadas
            </span>
        </h1>
      </div>
        {/* <div className="border-line border-b py-4">
        <h1 className="font-semibold">For Kids</h1>
        <h1>
          <span
            onClick={() => handleNavigation("ring for men", "Rings for men")}
            className="cursor-pointer"
          >
            Rings For Kids
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("earrings men", "Earrings for men")
            }
            className="cursor-pointer"
          >
            Earrings For Kids
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("bracelet for men", "Bracelet for men")}
            className="cursor-pointer"
          >
            Bracelets For Kids
          </span>{" "}
          |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
              Lockets For Kids
            </span>
            |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
            Chains For Kids
            </span>
            |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
             Siler jewellery For Kids
            </span>
        </h1>
      </div> */}
        {/* <div className="border-line border-b py-4">
        <h1 className="font-semibold">Silver Articles</h1>
        <h1>
          <span
            onClick={() => handleNavigation("ring for men", "Rings for men")}
            className="cursor-pointer"
          >
            Rings For Men
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("earrings men", "Earrings for men")
            }
            className="cursor-pointer"
          >
            Earrings For Men
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("bracelet for men", "Bracelet for men")}
            className="cursor-pointer"
          >
            Bracelets For Men
          </span>{" "}
          |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
              Men's Kadas
            </span>
        </h1>
      </div> */}
    </div>
  );
};

export default Extendedfooter;
