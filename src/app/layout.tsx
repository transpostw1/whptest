import { Suspense } from "react";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
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

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Montserrat({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     default: 'WHP Jewellers',
//     template: '%s | WHP Jewellers'
//   },
//   description: 'Welcome to WHP Jewellers',
//   icons: {
//     icon: '/images/other/logo2.png',
//   },
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <Suspense>
        <head>
          <title>WHP Jewellers</title>
          <link
            rel="icon"
            href="/images/other/main_logo.png"
            type="image/x-icon"
          />
          <meta name="description" content={"Welcome to WHP Jewellers."} />
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
        </Suspense>
      </html>
    </GlobalProvider>
  );
}
