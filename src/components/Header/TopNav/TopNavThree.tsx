import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
    props: string;
}

const TopNavThree: React.FC<Props> = ({ props }) => {
    return (
      <>
        <div
          className={`top-nav md:h-[55px] h-[55px] border-b border-line ${props}`}
        >
          <div className="container mx-auto h-full">
            <div className="top-nav-main flex justify-between max-md:justify-center h-full">
              <div className="left-content flex items-center">
                <Image
                  src={"/images/other/Logo.png"}
                  width={80}
                  height={80}
                  alt="80x80"
                  className=" object-cover"
                />
              </div>
              <div className="right-content flex items-center gap-5 max-md:hidden">
                df
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default TopNavThree