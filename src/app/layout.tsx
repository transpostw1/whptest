import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import Footer from "@/components/Footer/Footer";
import UserTracking from "./UserTracking";
import { Toaster } from 'react-hot-toast';

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/other/logo2.png" />
          <meta name="whp" content="Welcome to WHP jewwellers" />
        </head>
        {/* <Suspense> */}
        <body className={instrument.className}>
          <UserTracking />
          <TopNavOne textColor="text-white" />
          <NavTwo props="style-three bg-white" />
          <div id="header" className="w-full">
            <NavHoverMenu props="bg-white" />
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
