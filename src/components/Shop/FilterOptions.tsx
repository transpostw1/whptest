// FilterOptions.jsx
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
interface Filter{
  title:string|any;
  options:string[]
}
const Filter = [
  {
    title: "Price",
    options: ["Less than 10K", "10k to 20K", "20k to 30k", "30k and Above"],
  },
  {
    title: "Karat",
    options: ["14k", "18K","22k","23K","24k"],
  },
  {
    title: "Weight",
    options: ["0-2 g", "2-5 g", "5-10 g", "10-20 g"],
  },
  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
  },
  { title: "Metal", options: ["Rose Gold","White Gold","Yellow Gold","Diamond","Sliver"] },
  {
    title: "Occasion",
    options: [
      "Birth",
      "Casual Wear",
      "Daily Indian",
      "Engagement",
      "Festive",
      "Everyday",
      "Work Wear",
      "Wedding Wear",
      "Desk to Dinner",
      "Evening",
      "Party Wear",
    ],
  },
];
interface Props{
  filterDropDown:string;
  handleFilterDropdown:(arg:string)=>void;
  handleOptionSelect:(option:string,category:string)=>void;
  selectedOptions:string[]
}

const FilterOptions:React.FC<Props> = ({ filterDropDown, handleFilterDropdown, handleOptionSelect ,selectedOptions}) => {
  
  return (
    <>
      {Filter.map((item:Filter, index:number) => (
        <div key={index} className={`item cursor-pointer overflow-auto no-scrollbar`} onClick={() => handleFilterDropdown(item.title)}>
          <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
            <p className="text-lg font-semibold">{item.title}</p>

            <p className="mt-1">
              <Icon.CaretDown weight="fill" />
            </p>
          </div>
          {filterDropDown === item.title ? (
            <div>
              {item.options.map((option:string) => (
                <div key={option}>
                  <input
                    type="checkbox"
                    id={option}
                    checked={selectedOptions[item.title]?.includes(option)}
                    onChange={() => handleOptionSelect(option, item.title)}
                  />
                  <label className="ml-2" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default FilterOptions;