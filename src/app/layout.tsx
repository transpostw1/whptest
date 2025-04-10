import { Suspense } from "react";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import {
  Noto_Sans,
  Poiret_One,
  Roboto,
  Playfair_Display,
  Inter,
} from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300"],
});
const instrument = inter;

// const instrument = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WHP Jewellers",
    template: "%s | WHP Jewellers",
  },
  description: "Welcome to WHP Jewellers",
  icons: {
    icon: "/images/other/logo2.png",
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
    name: "WHP Jewellers",
    description: "Welcome to WHP Jewellers",
    url: "https://whpv.vercel.app",
    logo: "/images/other/main_logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-YOUR-PHONE-NUMBER",
      contactType: "Customer Service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Store Address",
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "Your Postal Code",
      addressCountry: "Your Country",
    },
  };

  return (
    <GlobalProvider>
      <html lang="en">
        {/* <Suspense> */}
        <head>
          <Script
            id="organization-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
    

<Script id="hotjar" strategy="afterInteractive">
    {`
      (function (c, s, q, u, a, r, e) {
          c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
          c._hjSettings = { hjid: 5364556 };
          r = s.getElementsByTagName('head')[0];
          e = s.createElement('script');
          e.async = true;
          e.src = q + c._hjSettings.hjid + u;
          r.appendChild(e);
      })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js');
    `}
  </Script>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-KS3DVFD5ZW"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}      
    gtag('js', new Date());
    gtag('config', 'G-KS3DVFD5ZW', {
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true
    });
  `}
          </Script>
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
              __html: JSON.stringify(organizationSchema),
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
