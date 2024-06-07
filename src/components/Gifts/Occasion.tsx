import React from 'react'
import Image from 'next/image';


interface OccasionProps {
  onSelectOccasion: (occasion: string) => void;
}

const Occasion:  React.FC<OccasionProps> = ({ onSelectOccasion }) => {
  const handleOccasionSelect = (occasion: string) => {
    onSelectOccasion(occasion);
  };
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-4 w-full">
      <div
        onClick={() => handleOccasionSelect("Diwali")}
        className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
      >
        <Image
          width={400}
          height={300}
          className="w-full h-[250px] object-fill object-center"
          src="/images/other/GemStone1.png"
          alt="sfd"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold ">Diwali</h3>
        </div>
      </div>
      <div className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
        <Image
          width={400}
          height={300}
          className="w-full h-[250px] object-cover object-center"
          src="/images/other/GemStone1.png"
          alt="sfd"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold ">Diwali</h3>
        </div>
      </div>
      <div className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
        <Image
          width={400}
          height={300}
          className="w-full h-[250px] object-cover object-center"
          src="/images/other/GemStone1.png"
          alt="sfd"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold ">Diwali3</h3>
        </div>
      </div>
    </div>
  );
};

export default Occasion
