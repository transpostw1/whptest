import { Suspense } from "react";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Noto_Sans, Poiret_One, Roboto,Playfair_Display,Inter } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import NavHoverMenu2 from "@/components/Header/Menu/NavHoverMenu2";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import Footer from "@/components/Footer/Footer";
import UserTracking from "./UserTracking";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import { NextSeo } from "next-seo";
import SEO from "../../next-seo.config";
import Script from "next/script";

const serverTimeLeft: CountdownTimeType = countdownTime();

// const notoSans = Noto_Sans({
//   subsets: ["latin"],
//   weight: [ "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
// });

// const poiretOne = Poiret_One({
//   subsets: ["latin"],
//   weight: ["400"], 
// });
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });
// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
//   style: ["normal", "italic"],
// });

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["300", "400", "500"],
// });
// const instrument = roboto ;

const instrument = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'WHP Jewellers',
    template: '%s | WHP Jewellers'
  },
  description: 'Welcome to WHP Jewellers',
  icons: {
    icon: '/images/other/logo2.png',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "WHP Jewellers",
    "description": "Welcome to WHP Jewellers",
    "url": "https://whpv.vercel.app",
    "logo": "/images/other/main_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-YOUR-PHONE-NUMBER",
      "contactType": "Customer Service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Store Address",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "Your Postal Code",
      "addressCountry": "Your Country"
    }
  };

  return (
    <GlobalProvider>
      <html lang="en">
        {/* <Suspense> */}
        <head>
          <title>WHP Jewellers</title>
          <link
            rel="icon"
            href="/images/other/main_logo.png"
            type="image/x-icon"
          />
          <meta name="description" content={"Welcome to WHP Jewellers."} />
          <Script
            id="organization-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema)
            }}
          />
        </head>
        <body className={instrument.className}>
          <UserTracking />
          <TopNavOne textColor="text-white" />
          <NavTwo props="style-three bg-white" />
          <div id="header" className="w-full">
            <NavHoverMenu2 />
          </div>
          {children}
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </body>
        {/* </Suspense> */}
      </html>
    </GlobalProvider>
  );
}
