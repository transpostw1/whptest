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
        <header className="bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-3xl font-semibold">Waman Hari Pethe Jewellers</h1>
            <p>Pure trust since 1909</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
          <section>
            <h2 className="text-2xl font-bold mb-4">Welcome to WHP Jewellers</h2>
            <p className="mb-4">
              Welcome to <strong>WHP Jewellers</strong>, your one-stop destination for a diverse
              collection of gold, diamond, and silver jewellery. Whether you're looking for the
              perfect <a className="text-[#bb547d] hover:underline" href="https://whpv.vercel.app/products?url=c-ring" target="_blank">rings</a>,
              <a className="text-[#bb547d] *:hover:underline" href="https://whpv.vercel.app/products?url=c-earring" target="_blank">earrings</a>,
              <a className="text-[#bb547d] hover:underline" href="https://whpv.vercel.app/products?url=c-pendant" target="_blank">pendants</a>, and more,
              we offer an extensive selection for men, women, and children. Our bespoke jewellery
              service ensures that you can customize designs to suit your unique style and needs.
            </p>
            <p>
              Since our inception in 2016, WHP Jewellers has been catering to the jewellery desires
              of both India and abroad. Trusted by thousands for purity and transparency, we bring
              only 100% BIS hallmarked gold, certified diamonds, and certified colored stones to our
              customers.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Why Choose WHP Jewellers?</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Wide Range of Jewellery</strong>: Shop our beautiful collection for any occasion.</li>
              <li><strong>Custom Jewellery Design</strong>: Create a piece that’s uniquely yours.</li>
              <li><strong>Quality Assurance</strong>: Handmade with care and strict quality checks.</li>
              <li><strong>Convenient Shopping</strong>: Free shipping across India and a 30-day return policy.</li>
              <li><strong>Flexible Payment Options</strong>: Enjoy EMI options and Try at Home service.</li>
              <li><strong>Lifetime Exchange and Buyback</strong>: Secure policies tailored to Indian buyers.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Shop Online with Confidence</h2>
            <p>
              At WHP Jewellers, we know that jewellery purchases are an investment. That's why we
              offer secure shipping PAN India, with over 100,000 satisfied customers. Enjoy lifetime
              exchange and buyback options, designed specifically with Indian consumers in mind.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Discover Our Unique Collections</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Anayra</strong>: Sterling Silver 92.5 Jewellery featuring elegant designs.</li>
              <li><strong>9Ratna</strong>: A colorful array of precious stones.</li>
              <li><strong>Silver Articles</strong>: Perfect for gifts and special occasions.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Trusted by Thousands for Quality & Service</h2>
            <p>
              All of our gold jewellery is 100% BIS Hallmarked, ensuring the highest standards of
              quality and purity. For a seamless and secure shopping experience, choose WHP
              Jewellers for all your jewellery needs.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li><strong>Address:</strong> 306, 3rd Floor, Man Excellenza, JN of SV Road, Opp Pawan Hans, Vile Parle (W), Mumbai, Maharashtra - 400056</li>
              <li><strong>Email:</strong> care@whpjewellers.in</li>
              <li><strong>Contact No.:</strong> 1800-222-225 (10:30 AM to 7:30 PM)</li>
            </ul>
          </section>
        </main>

        <footer className="bg-gray-100 text-center py-4">
          <p>&copy; {new Date().getFullYear()} WHP Jewellers. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
