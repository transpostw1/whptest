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
        <title>WHP Jewellers - About Us</title>
        <meta
          name="description"
          content="Learn about WHP Jewellers' journey, leadership, sub-brands, and commitment to quality and innovation in the jewellery industry."
        />
      </Head>

      <div className="bg-gray-50 text-gray-800">
        <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
          {/* Meet the Founder */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Founder & Director</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Mr. Aditya Pethe is a visionary leader in the jewellery industry. His entrepreneurial journey reflects a deep understanding of craftsmanship paired with a bold, forward-thinking approach to technology and customer engagement. With over 25 years of in-depth experience spanning jewellery design, manufacturing, e-commerce, retail branding, and business innovation, he has consistently driven growth and transformation.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Under his leadership, the brand has embraced digital transformation, offering customers a unified shopping experience across online platforms. He envisions making jewellery accessible to every Indian household, delivering a seamless and trusted shopping experience, and aiming to build WHP as the nation’s leading e-commerce jewellery brand.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Today, WHP Jewellers holds a significant market share and continues to grow steadily, guided by Mr. Aditya Pethe’s passion for quality, innovation, and delivering “something special for everyone.” His commitment to excellence has positioned WHP as a household name in India’s jewellery landscape—trusted, loved, and admired across generations.
            </p>
          </section>

          {/* The Journey of WHP Jewellers */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Journey of WHP Jewellers</h2>
            <p className="text-base md:text-lg leading-relaxed">
              WHP Jewellers has evolved from a legacy name into one of India’s most trusted e-commerce jewellery brands. Launched in 2016 with a mission to bring jewellery closer to modern consumers, WHP has redefined the way India shops for gold, diamonds, gemstones, and silver jewellery, offering a seamless online shopping experience.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              With a strong online presence through{" "}
              <a href="https://www.whpjewellers.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                www.whpjewellers.com
              </a>
              , the brand caters to customers across India and abroad. WHP offers certified, BIS-hallmarked jewellery and a wide range of designs for every age, style, and occasion.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              In tune with today’s market demands, our focus is on offering affordable casual wear and versatile gifting jewellery designed to resonate with all age groups. Backed by strategic investments, WHP has scaled its digital infrastructure, enhanced customer experiences, and introduced convenience-led services.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              We offer complete pricing transparency, secure payment options, and fast pan-India delivery, supported by dedicated customer service to ensure a smooth online shopping experience. In a thriving e-commerce market, we’re making jewellery more accessible, closer, faster, and easier than ever.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              With every piece, WHP Jewellers continues its journey of celebrating stories, emotions, and timeless beauty—bringing “something special for everyone, every reason, every season, every emotion, every occasion, every profession.”
            </p>
          </section>

          {/* Our Sub-Brands */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Sub-Brands: A Vision of Diversity and Well-Being</h2>
            <ul className="space-y-4 text-base md:text-lg">
              <li>
                <strong>Anayra</strong> – A curated collection of elegant fine silver jewellery that blends contemporary charm with everyday versatility.
              </li>
              <li>
                <strong>Swarnak 24K Ayurveda</strong> – A luxurious 24K gold-infused skincare brand, rooted in Ayurvedic principles to enhance natural beauty and radiance.
              </li>
              <li>
                <strong>SwarnakAyu</strong> – A holistic Ayurvedic wellness brand offering supplements and formulations that support immunity, vitality, and overall health.
              </li>
            </ul>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Together, these brands reflect WHP’s commitment to innovation, purity, and well-being—something special for every moment, inside and out.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
