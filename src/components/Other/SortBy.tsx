import React from "react";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
}

const SortOptions = [
  "Latest",
  "Discount",
  "Featured",
  "Price Low To High",
  "Price High To Low",
  "Customer Rating",
];
const SortBy: React.FC<Props> = (props) => {
  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      props.onClose();
    }
  };
  
  if (!props.visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 z-50"
      id="container"
      onClick={handleOnClose}
    >
      <div className="fixed bg-white left-0 w-[100%] h-[50%] bottom-0 rounded-t-3xl">
        <p className="w-[100%]  text-center text-xl bg-[#e26178] p-4 rounded-t-3xl text-white">
          Sort Design By
        </p>
        <div className="p-4">
          {SortOptions.map((option: any) => (
            <div key={option} className="mt-4 text-lg hover:text-[#e26178]">{option}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SortBy;
