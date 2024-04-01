"use client"
import React ,{useState,useEffect} from "react";
import Image from "next/image";

const WhpApp = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  if(isMobile){
    return (<div>
      <Image src="/dummy/mobileDownloadAppBanner.png" alt="mobile_App_Banner" width={375} height={532}/>
    </div>)
  }
  return (
    <>
      <div>
        <Image
          src={"/dummy/WhpAppImage.png"}
          alt="Download WHP App From Play Store or App Store"
          width={1440}
          height={520}
        />
      </div>
    </>
  );
};

export default WhpApp;
