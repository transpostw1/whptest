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
              WHP Jewellers is a one-stop destination for all your jewellery
              needs. We offer a wide range of gold and diamond jewellery for
              men, women and children. Our collection includes rings, earrings,
              pendants, necklaces, bangles, bracelets and more. We also offer
              customised jewellery as per your requirements. Our goal is to help
              you find the perfect piece of jewellery to suit your style, budget
              and occasion.
            </p>
            <p className="mt-2">
              We are committed to providing outstanding customer service, and We
              offer free shipping and 30-day return policy on all our products.
              So, shop with confidence and choose us for all your jewellery
              needs! Since 2016, we have been catering to the jewellery needs of
              the Indian diaspora in India and abroad.
            </p>
            <p className="mt-2">
              Trusted by patrons for purity and transparency, we bring only 100%
              BIS hallmarked Gold, Certified Diamonds, and Certified Colored
              Stones. An Indian acquires their first piece of gold adornment at
              birth and from there on the personal jewellery trousseau keeps
              building up. Be it the birth of a child, an engagement or a
              wedding or just another day at work, at WHP Jewellers we have
              crafted jewels for every moment of your life.
            </p>
            <p className="mt-2">
              From Gold coins to Head-to-toe bridal trousseau, WHP Jewellers has
              been fulfilling fine jewellery needs of every budget and
              requirement since inception. Each piece is handmade with care and
              attention to detail, and undergoes several quality checks to
              ensure that our customers receive nothing less than the best. To
              make jewellery more accessible to our patrons, we also offer EMI
              options. Keeping in mind the comfort and safety of our patrons, we
              also provide Try at Home Service where our jewellery consultant
              brings our store at your home for you to try and select the
              jewellery of your choice without stepping out. You can also sell
              your jewellery from the comfort of your home now.
            </p>
            <p className="mt-2">
              Brainchild of Dr. Aditya Pethe, www.whpjewellers.in the brand has
              stably grown and holds a noteworthy market share.
            </p>
            <p className="mt-2">
              For the fashionistas who have a distinct vision for their own
              jewellery designs, we also provide customization where our design
              team collaborates with you to bring your vision to life. You can
              also buy an authentic WHP Jewellers jewel from Our Website
              www.whpjewellers.in and marketplaces including www.nykaa.com ,
              www.ajio.com , www.amazon.com , www.flipkart.com ,
              www.tataclicq.com and www.amazon.in.
            </p>
            <p className="mt-2">
              Our free & Secured Shipping PAN India has satisfied more than 1Lac
              customers. A lifetime exchange and buyback policy is designed with
              Indian consumer’s jewellery buying needs in mind. To safeguard our
              patrons, we also provide Complimentary for one year.
            </p>
            <p className="mt-2">
              We offer a wide range of jewellery, from our own brand Anayra Our
              Sterling 92.5 Silver Jewellery perfect for the millennial woman.
              Along with Fine Jewellery, we also bring a wide array of silver
              articles including utensils, idols of deities and much more. And a
              huge collections of Coloured stones under the brand 9Ratna.
            </p>
            <p className="mt-2">
              Address: 306, 3rd Floor, Man Excellenza, JN of SV Road, Opp Pawan
              Hans, Vile Parle (W), Mumbai, Maharashtra - 400056
            </p>
            <p className="mt-2">
              Email: care@whpjewellers.in | Contact No.: 1800-222-225 (10:30 AM
              to 7:30 PM)
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
