import React, { useState } from "react";
import Image from "next/image";

interface OccasionProps {
  onSelectOccasion: (occasion: string) => void;
  voucherData: any;
  onTemplateSelect: (templateId: number) => void;
}

const Occasion: React.FC<OccasionProps> = ({
  onSelectOccasion,
  voucherData,
  onTemplateSelect,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplateId(templateId);
    onTemplateSelect(templateId); // Call onTemplateSelect with the selected template ID
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-4 w-full">
      {voucherData?.map((voucherData: any, index: number) => (
        <div
          key={index}
          onClick={() => handleTemplateSelect(voucherData.id)}
          className={`rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer ${
            selectedTemplateId === voucherData.id ? "bg-blue-200" : ""
          }`}
        >
          <Image
            width={400}
            height={300}
            className="w-full h-[250px] object-fill object-center"
            src={voucherData.thumbnailImage}
            alt={voucherData.id}
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">{voucherData.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Occasion;
