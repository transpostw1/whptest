import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import ModalSearch from "@/components/Modal/ModalSearch";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import Footer from "@/components/Footer/Footer";

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WHP Web",
  description: "WHP Jewellers app",
  icons: {
    icon: "/images/Bracelet.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={instrument.className}>
          <TopNavOne textColor="text-white" />
          <NavTwo props="style-three bg-white" />
          <div id="header" className="w-full ">
            <NavHoverMenu props="bg-white" />
          </div>
          {children}
          <Footer />
        </body>
      </html>
    </GlobalProvider>
  );
}
