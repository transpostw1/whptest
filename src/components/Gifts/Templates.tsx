import React from "react";
import Image from "next/image";

interface TemplatesProps {
  selectedOccasion: string;
  selectedTemplateId: number | null; // Add selectedTemplateId prop
  voucherData: any[];
}

const Templates: React.FC<TemplatesProps> = ({
  selectedOccasion,
  selectedTemplateId,
  voucherData,
}) => {
 
  const selectedVoucher = voucherData.find(
    (voucher) => voucher.id == selectedOccasion
  );

  if (!selectedVoucher) {
    return <div>No voucher data available for the selected occasion{selectedVoucher}</div>;
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-4 w-full">
      {selectedVoucher.templateImage.map(
        (templateImageUrl: string, index: number) => (
          <div
            key={index}
            className={`rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden ${
              selectedTemplateId === selectedVoucher.id ? "bg-blue-200" : ""
            }`}
          >
            <Image
              width={400}
              height={300}
              className="w-full h-[250px] object-fill object-center"
              src={templateImageUrl}
              alt={`Template ${index + 1}`}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{selectedVoucher.name}</h3>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Templates;
