import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  handleSizeGuideModal: () => any;
  content: any;
}
const SizeGuideModal: React.FC<Props> = ({ handleSizeGuideModal, content }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg sm:h-full md:mx-0">
        <div className="flex cursor-pointer justify-end">
          <Icon.X size={22} onClick={() => handleSizeGuideModal()} />
        </div>
        <h1 className="my-2 text-center text-3xl font-bold text-[#e26178]">
          {content.name}
        </h1>
        <div
          className="max-h-full max-w-full"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </div>
  );
};

export default SizeGuideModal;
