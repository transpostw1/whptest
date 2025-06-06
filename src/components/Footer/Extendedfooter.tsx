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
      router.push(`/products?url=pc-${value2}`);
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
              handleNavigation("bangles_and_bracelet", "Bracelets for women")
            }
            className="cursor-pointer"
          >
            Bracelets For Women
          </span>
          |
          <span
            onClick={() =>
              handleNavigation("bangles_and_bracelet", "Bangles for women")
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
          >{" "}
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
            onClick={() => handleNavigation("all_jewellery_mens_jewellery_rings", "Rings for men")}
            className="cursor-pointer"
          >
            Rings For Men
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("all_jewellery_mens_jewellery_studs", "Studs for men")
            }
            className="cursor-pointer"
          >
            Studs For Men
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("all_jewellery_mens_jewellery_bracelet", "Bracelet for men")}
            className="cursor-pointer"
          >
            Bracelets For Men
          </span>{" "}
          |  <span onClick={() => handleNavigation('all_jewellery_mens_jewellery_kada','Mens Kada')} className="cursor-pointer">
              Men's Kadas
            </span>
        </h1>
      </div>
        <div className="border-line border-b py-4">
        <h1 className="font-semibold">For Kids</h1>
        <h1>
          <span
            onClick={() => handleNavigation("all_jewellery_kids_jewellery_ring", "Rings for kids")}
            className="cursor-pointer"
          >
            Rings For Kids
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("all_jewellery_kids_jewellery_earrings", "Earrings for kids")
            }
            className="cursor-pointer"
          >
            Earrings For Kids
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("bracelet for men", "Bracelet for Kids")}
            className="cursor-pointer"
          >
            Bracelets For Kids
          </span>{" "}
          |  <span onClick={() => handleNavigation('all_jewellery_kids_jewellery_locket','Lockets for Kids')} className="cursor-pointer">
              Lockets For Kids
            </span>
            |  <span onClick={() => handleNavigation('all_jewellery_kids_jewellery_chain','Chains For Kids')} className="cursor-pointer">
            Chains For Kids
            </span>
            |  <span onClick={() => handleNavigation('all_jewellery_kids_jewellery_silver_jewellery','Silver Jewellery For Kids')} className="cursor-pointer">
             Silver jewellery For Kids
            </span>
        </h1>
      </div> 
        <div className="border-line border-b py-4">
        <h1 className="font-semibold">Silver Articles</h1>
        <h1>
          <span
            onClick={() => handleNavigation("all_jewellery_silver_article_pooja_articles", "Pooja Articles")}
            className="cursor-pointer"
          >
            Pooja Articles
          </span>
          |{" "}
          <span
            onClick={() =>
              handleNavigation("all_jewellery_silver_article_utensils", "Utensils")
            }
            className="cursor-pointer"
          >
            Utensils
          </span>{" "}
          |{" "}
          <span
            onClick={() => handleNavigation("all_jewellery_silver_article_idols", "Idols")}
            className="cursor-pointer"
          >
            Idols
          </span>{" "}
          |  <span onClick={() => handleNavigation('all_jewellery_silver_article_silver_gifting','Silver Gifting')} className="cursor-pointer">
              Silver Gifting
            </span>
        </h1>
      </div>
    </div>
  );
};

export default Extendedfooter;
