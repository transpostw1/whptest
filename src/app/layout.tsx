import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu2 from "@/components/Header/Menu/NavHoverMenu2";
import Footer from "@/components/Footer/Footer";
import UserTracking from "./UserTracking";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/Other/ServiceWorkerRegistration";
import CriticalCSS from "@/components/Other/CriticalCSS";
// Analytics removed - enable when needed
// import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300"],
});
const instrument = inter;

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
    url: "https://www.whpjewellers.com",
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
          {/* DNS prefetch for external domains */}
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://whpjewellers.s3.amazonaws.com" />
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
          
          {/* Load GTM after interactive to reduce blocking */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5T2F5CF');
    `,
            }}
          />
          
          {/* Lightweight script blocker - moved to afterInteractive to prevent blocking */}
          <Script
            id="lightweight-blocker"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      // Lightweight kenyt.ai blocker (non-blocking)
      if (typeof window !== 'undefined') {
        // Simple fetch override without heavy operations
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
          const url = args[0];
          if (typeof url === 'string' && url.includes('kenyt.ai')) {
            return Promise.reject(new Error('Blocked'));
          }
          return originalFetch.apply(this, args);
        };
      }
    `,
            }}
          />
          
          {/* Schema markup - critical for SEO */}
          <Script
            id="organization-schema"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />

          {/* Google Analytics - reduced blocking */}
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
      send_page_view: false,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      cookie_flags: 'SameSite=None;Secure',
      cookie_domain: 'auto',
      cookie_expires: 63072000
    });
  `}
          </Script>
          
          {/* Facebook Pixel - after interactive to reduce blocking */}
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '430576226299518');
      fbq('track', 'PageView');
    `,
            }}
          />
          
          <meta
            name="google-site-verification"
            content="isU2W3q3NcKIIWnMP9XLOGV66600qUnfhir4RiD7j0M"
          />
          <title>WHP Jewellers</title>
          <link
            rel="icon"
            href="/images/other/main_logo.png"
            type="image/x-icon"
          />
          <meta name="description" content={"Welcome to WHP Jewellers."} />
        </head>
        <body className={instrument.className}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5T2F5CF"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* <Analytics /> */}
          <CriticalCSS />
          {/* Simple, non-blocking Service Worker registration */}
          <Script
            id="simple-sw"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      // Simple service worker registration (non-blocking)
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
              console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    `,
            }}
          />
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
