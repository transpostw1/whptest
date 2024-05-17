import React from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

const flickityOptions = {
  wrapAround: true,
  pageDots:false,
  prevNextButtons:false,
};
const MobileAllSchemes = () => {
  return (
    <Flickity
      className={"js-flickity"}
      elementType={"div"}
      options={flickityOptions}
      disableImagesLoaded={false}
      reloadOnUpdate
      static
    >
      <div className="mr-3 mb-3">
        <p>Gold</p>
        <p>Total Installment Paid:4</p>
        <p>Installment Remaining:6</p>
        <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
        <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
      </div>
      <div className="mr-3 mb-3">
        <p>Diamond</p>
        <p>Total Installment Paid:4</p>
        <p>Installment Remaining:6</p>
        <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
        <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
      </div>
      <div className="mr-3 mb-3">
        <p>Sliver</p>
        <p>Total Installment Paid:4</p>
        <p>Installment Remaining:6</p>
        <p>Total Amount Paid:8000</p> <p>Next Installment:2000</p>
        <button className="bg-[#e26178] px-2 text-white">Pay Now</button>
      </div>
    </Flickity>
  );
};

export default MobileAllSchemes;
