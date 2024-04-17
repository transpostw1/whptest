import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl, addAddress } from "@/utils/constants";

interface Props {
  closeModal: () => void;
}

const AddAddressModal: React.FC<Props> = ({ closeModal }) => {
  const handleSubmit = async (values: any) => {
    try {
      const cookieTokenn = Cookies.get("localtoken");
      const response = await axios.post<{ data: any }>(
        `${baseUrl}${addAddress}`,
        {
          pincode: values.pincode,
          full_address: values.full_address,
          area: values.area,
          country: values.country,
          state: values.state,
          city: values.city,
          landmark: values.landmark,
          address_type: values.address_type,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        }
      );
      console.log("Response from backend:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      pincode: "",
      full_address: "",
      area: "",
      country: "",
      state: "",
      city: "",
      landmark: "",
      address_type: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-full">
      <div className="bg-white p-8 flex flex-col justify-between z-50 rounded-xl">
        <button onClick={closeModal}>Close</button>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-semibold">Add Address</h2>
          <div className="my-2 md:col-span-2">
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Pincode"
              {...formik.getFieldProps("pincode")}
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <div className="text-red-700 font-medium">
                {formik.errors.pincode}
              </div>
            )}
          </div>
          <div className="mb-4 md:col-span-1">
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="full_address/House No/Building Name/Company"
              {...formik.getFieldProps("full_address")}
            />
            {formik.touched.full_address && formik.errors.full_address && (
              <div className="text-red-700 font-medium">
                {formik.errors.full_address}
              </div>
            )}
          </div>
          <div className="mb-4 md:col-span-1">
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Area and Street"
              {...formik.getFieldProps("area")}
            />
            {formik.touched.area && formik.errors.area && (
              <div className="text-red-700 font-medium">
                {formik.errors.area}
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-x-2">
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Country"
                {...formik.getFieldProps("country")}
              />
              {formik.touched.country && formik.errors.country && (
                <div className="text-red-700 font-medium">
                  {formik.errors.country}
                </div>
              )}
            </div>
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="State"
                {...formik.getFieldProps("state")}
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-700 font-medium">
                  {formik.errors.state}
                </div>
              )}
            </div>
            <div className="mb-4 md:col-span-1">
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="City"
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-700 font-medium">
                  {formik.errors.city}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 md:col-span-1">
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Landmark"
              {...formik.getFieldProps("landmark")}
            />
            {formik.touched.landmark && formik.errors.landmark && (
              <div className="text-red-600">{formik.errors.landmark}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium">Address Type:</label>
            <div className="mt-2 flex">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="home"
                  name="address_type"
                  value="home"
                  checked={formik.values.address_type === "home"}
                  onChange={formik.handleChange}
                  className="form-radio"
                />
                <label htmlFor="home" className="ml-2">
                  Home
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="work"
                  name="address_type"
                  value="work"
                  checked={formik.values.address_type === "work"}
                  onChange={formik.handleChange}
                  className="form-radio"
                />
                <label htmlFor="work" className="ml-2">
                  Work
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="address_type"
                  value="other"
                  checked={formik.values.address_type === "other"}
                  onChange={formik.handleChange}
                  className="form-radio"
                />
                <label htmlFor="other" className="ml-2">
                  Other
                </label>
              </div>
            </div>
            {formik.touched.address_type && formik.errors.address_type && (
              <div className="text-red-600 mt-1">
                {formik.errors.address_type}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-rose-400 border border-transparent rounded-md hover:bg-rose-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;