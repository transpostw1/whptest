// "use client";
// import React from "react";
// import { useBlog } from "@/context/BlogContext";
// import Loader from "@/components/Other/Loader";

// const About = () => {
//   const { aboutusData, loading } = useBlog();

//   if (loading) {
//     return <Loader />;
//   }

//   if (!aboutusData) {
//     return <div>No data available</div>;
//   }

//   return (
//     <>
//        <head>
//         <title>About Us</title>
//         <meta name="description" content={"All about WHP."} />
//       </head>
//     <div className="mx-5">
//     <h1 className="my-8 text-center text-3xl font-bold text-[#e26178]">{aboutusData.name}</h1>
//       {/* <Image
//         objectFit="cover"
//         src={"/images/banner/waman-hari-pethe-jewellers.png"}
//         alt="about"
//         width={5000}
//         height={5000}
//       /> */}
//       <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: aboutusData.content }} />
//     </div>
//     </>
//   );
// };

// export default About;

import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>WHP Jewellers - Gold & Diamond Jewellery Online</title>
        <meta
          name="description"
          content="Shop gold, diamond, and silver jewellery online with WHP Jewellers. Trusted for quality and authenticity since 2016."
        />
      </Head>
      <div className="bg-gray-50 text-gray-800">
        <main className="mx-auto max-w-7xl px-4 py-10">
          <section>
            <h2 className="mb-4 text-2xl font-bold">
              Welcome to WHP Jewellers
            </h2>
            <p className="mb-4">
              WHP Jewellers is your one-stop destination for all your jewellery
              needs. We offer an extensive range of gold and diamond jewellery
              for men, women, and children. Our collection includes rings,
              earrings, pendants, necklaces, bangles, bracelets, and more. We
              also provide customised jewellery tailored to your specific
              requirements. Our goal is to help you find the perfect piece that
              matches your style, budget, and occasion.
            </p>
            <p className="mt-2">
              We are committed to delivering outstanding customer service. Enjoy
              free shipping and a 30-day return policy on all products, allowing
              you to shop with complete confidence. Since 2016, we have been
              catering to the jewellery needs of customers across India and
              around the globe.
            </p>
            <p className="mt-2">
              Trusted for purity and transparency, we offer only 100% BIS
              hallmarked gold, certified diamonds, and certified coloured
              stones. In India, gold holds a special place from the moment of
              birth. Whether it’s the birth of a child, an engagement, a
              wedding, or just another day at work—at WHP Jewellers, we craft
              exquisite pieces for every milestone in life.
            </p>
            <p className="mt-2">
              From gold coins to head-to-toe bridal trousseaus, WHP Jewellers
              caters to every budget and requirement. Each piece is handcrafted
              with care and precision, undergoing multiple quality checks to
              ensure you receive only the finest jewellery. To make shopping
              even more convenient, we offer EMI options. Our Try-at-Home
              service lets you experience our jewellery in the comfort of your
              home, with a consultant bringing the store to your doorstep. You
              can even sell your jewellery from home.
            </p>
            <p className="mt-2">
              A brainchild of Dr. Aditya Pethe,{" "}
              <a
                href="https://www.whpjewellers.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.whpjewellers.in
              </a>{" "}
              has steadily grown, earning a significant share in the jewellery
              market.
            </p>
            <p className="mt-2">
              For those with a unique vision, we offer jewellery
              customisation—collaborate with our expert design team to bring
              your ideas to life. Our products are available on our website and
              also on popular marketplaces including{" "}
              <a href="https://www.nykaa.com" target="_blank">
                Nykaa
              </a>
              ,{" "}
              <a href="https://www.ajio.com" target="_blank">
                AJIO
              </a>
              ,{" "}
              <a href="https://www.amazon.in" target="_blank">
                Amazon
              </a>
              ,{" "}
              <a href="https://www.flipkart.com" target="_blank">
                Flipkart
              </a>
              , and{" "}
              <a href="https://www.tatacliq.com" target="_blank">
                Tata CLiQ
              </a>
              .
            </p>
            <p className="mt-2">
              With free and secure PAN India shipping, we’ve served over 1 lakh
              satisfied customers. Our lifetime exchange and buyback policy is
              thoughtfully designed with Indian consumers in mind. We also offer
              complimentary services for one year to ensure your peace of mind.
            </p>
            <p className="mt-2">
              Explore our in-house brand <strong><a href="https://www.anayra.net" target="_blank">
                Anayra
              </a></strong>, offering
              Sterling 92.5 silver jewellery perfect for the millennial woman.
              In addition to fine jewellery, we offer a variety of silver items
              including utensils, deity idols, and more. Discover our extensive
              collection of coloured stones under the brand{" "}
              <strong>9Ratna</strong>.
            </p>
            <p className="mt-2">
              <strong>Address:</strong> 306, 3rd Floor, Man Excellenza, Junction
              of S.V. Road, Opp. Pawan Hans, Vile Parle (W), Mumbai, Maharashtra
              - 400056
            </p>
            <p className="mt-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:care@whpjewellers.in">care@whpjewellers.in</a> |{" "}
              <strong>Contact No.:</strong> 1800-222-225 (10:30 AM to 7:30 PM)
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
