import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  handleSizeGuideModal: () => any;
  content: any;
}
const SizeGuideModal: React.FC<Props> = ({handleSizeGuideModal,content}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg md:mx-0 sm:h-[555px] overflow-auto">
        <div className="flex justify-end" onClick={()=>handleSizeGuideModal()}>
            <Icon.X size={22}/>
        </div>
      <h1 className="my-2 text-center text-3xl font-bold text-[#e26178]">
          {content.name}
        </h1>
        <div  className="max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
       
      </div>
    </div>
  );
};

export default SizeGuideModal;
