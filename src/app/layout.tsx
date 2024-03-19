
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NavTwo from "@/components/Header/TopNav/NavTwo";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ModalCart from "@/components/Modal/ModalCart";
import ModalWishlist from "@/components/Modal/ModalWishlist";
import ModalSearch from "@/components/Modal/ModalSearch";
import ModalQuickview from "@/components/Modal/ModalQuickview";
import ModalCompare from "@/components/Modal/ModalCompare";
import CountdownTimeType from "@/type/CountdownType";
import { countdownTime } from "@/store/countdownTime";
import Footer from "@/components/Footer/Footer";


const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WHP Web",
  description: "WHP Jewellers app",
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
            <div id="header" className="w-full relative">
              <NavHoverMenu props="bg-white" />
            </div>

          {children}
          <ModalCart serverTimeLeft={serverTimeLeft} />
          <ModalWishlist />
          <ModalSearch />
          <ModalQuickview />
          <ModalCompare />
          <Footer/>
        </body>
      </html>
    </GlobalProvider>
  );
}
