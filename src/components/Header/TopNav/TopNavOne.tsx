import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
    props: string;
    slogan: string;
}

const TopNavOne: React.FC<Props> = ({ props, slogan }) => {
    return (
        <>
            <div className={`top-nav md:h-[44px] h-[30px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="top-nav-main flex justify-between max-md:justify-center h-full">
                        <div className="left-content flex items-center gap-5 max-md:hidden">
                        </div>
                        <div className="text-center text-button-uppercase text-white flex items-center">
                            {slogan}
                        </div>
                        <div className="right-content flex items-center gap-5 max-md:hidden">
                           
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNavOne