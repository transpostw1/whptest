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
    console.log("Formatted Value", value2);
    if (
      value2 == "earrings" ||
      value2 == "ring" ||
      value2 == "mangalsutra" ||
      value2 == "pendants" ||
      value2 == "bangle" ||
      value2 == "bracelet" ||
      value2 == "necklace"
    ) {
      router.push(`/products?url=c-${value2}`);
    } else {
      router.push(`/products?url=s-${value2}`);
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
            onClick={() =>
              handleNavigation("rings for women", "Rings for women")
            }
            className="cursor-pointer"
          >
            Rings For Women
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("earrings for women", "Earrings for women")
            }
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
              handleNavigation("bangle for women", "Bangles for women")
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
              handleNavigation("necklace for women", "Necklaces for women")
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
              handleNavigation("earrings for men", "Earrings for men")
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
            Bracelet For Men
          </span>{" "}
          |  <span onClick={() => handleNavigation('mens kada','Mens Kada')} className="cursor-pointer">
              Men's Kada
            </span>
        </h1>
      </div>
    </div>
  );
};

export default Extendedfooter;
