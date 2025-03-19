import React, { useState,useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as Icon from "@phosphor-icons/react";
import { graphqlbaseUrl } from "@/utils/constants";

interface Props {
  closeModal: any;
  singleAddress: any;
}
const EditAddressModal: React.FC<Props> = ({ closeModal, singleAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/states",
        );
        const countryData = response.data.data.map((country: any) => ({
          name: country.name,
          states: country.states.map((state: any) => state.name),
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCountry = countries.find(
        (country) => country.name === event.target.value
      );
      setStates(selectedCountry ? selectedCountry.states : []);
      formik.setFieldValue("country", event.target.value);
      formik.setFieldValue("state", ""); 
    };
  

  const validationSchema = Yup.object().shape({
    pincode: Yup.string().required("Pincode is required"),
    full_address: Yup.string().required("Full address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    landmark: Yup.string(),
    address_type: Yup.string().required("Address type is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    setFormError("");

    try {
      console.log("Submitting form with values:", values);
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;
      const getAuthHeaders = () => {
        if (!cookieToken) return null;
        return {
          authorization: `Bearer ${cookieToken}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const EDIT_CUSTOMER_ADDRESS = gql`
        mutation Mutation($customerAddresses: [EditCustomerAddressesInput!]!) {
          EditCustomerAddresses(customerAddresses: $customerAddresses) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: EDIT_CUSTOMER_ADDRESS,
        variables: {
          customerAddresses: {
            address_id: singleAddress.address_id,
            address_type: values.address_type,
            full_address: values.full_address,
            country: values.country,
            state: values.state,
            city: values.city,
            pincode: values.pincode,
            landmark: values.landmark,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      closeModal();
      formik.resetForm();
      window.location.reload();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error posting form data:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      pincode: singleAddress?.pincode || "",
      full_address: singleAddress?.full_address || "",
      country: singleAddress?.country || "",
      state: singleAddress?.state || "",
      city: singleAddress?.city || "",
      landmark: singleAddress?.landmark || "",
      address_type: singleAddress?.address_type || "home",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="no-scrollbar z-50 mx-4 flex max-h-[80vh] max-w-full flex-col justify-between overflow-y-auto bg-white p-4 sm:max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#e26178]">
            Edit Address
          </h2>
          <button onClick={closeModal} className="self-end">
            <Icon.X size={25} />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {formError && <div className="mb-4 text-red-500">{formError}</div>}
          <div className="mb-4">
            <div className="relative">
              <input
                id="pincode"
                className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                  formik.errors.pincode ? "border-red-500" : "border-gray-300"
                } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                type="text"
                placeholder=" "
                {...formik.getFieldProps("pincode")}
              />
              <label
                htmlFor="pincode"
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
              >
                Pincode
              </label>
            </div>
            {/* {formik.errors.pincode && (
              <div className="text-red-500 mt-1">{formik.errors.pincode}</div>
            )} */}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                id="full_address"
                className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                  formik.errors.full_address
                    ? "border-red-500"
                    : "border-gray-300"
                } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                type="text"
                placeholder=" "
                {...formik.getFieldProps("full_address")}
              />
              <label
                htmlFor="full_address"
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
              >
                Full Address
              </label>
            </div>
            {/* {formik.errors.full_address && (
              <div className="text-red-500 mt-1">{formik.errors.full_address}</div>
            )} */}
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
              <div className="relative">
                <select
                  id="country"
                  className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                    formik.touched.country && formik.errors.country ? "border-red-500" : "border-gray-300"
                  } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  value={formik.values.country}
                  onChange={handleCountryChange}
                  onBlur={formik.handleBlur}
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <option value="" label="Select country" />
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="country"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                >
                  Country
                </label>
              </div>
              {formik.touched.country && formik.errors.country && (
                <div className="mt-1 text-sm text-red-500">{formik.errors.country}</div>
              )}
            </div>
            <div>
              <div className="relative">
                <select
                  id="state"
                  className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                    formik.touched.state && formik.errors.state ? "border-red-500" : "border-gray-300"
                  } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  value={formik.values.state}
                  onChange={(e) => formik.setFieldValue("state", e.target.value)}
                  onBlur={formik.handleBlur}
                  disabled={!states.length}
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <option value="" label="Select state" />
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="state"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                >
                  State
                </label>
              </div>
              {formik.touched.state && formik.errors.state && (
                <div className="mt-1 text-sm text-red-500">{formik.errors.state}</div>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  id="city"
                  className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                    formik.touched.city && formik.errors.city ? "border-red-500" : "border-gray-300"
                  } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("city")}
                />
                <label
                  htmlFor="city"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                >
                  City
                </label>
              </div>
              {formik.touched.city && formik.errors.city && (
                <div className="mt-1 text-sm text-red-500">{formik.errors.city}</div>
              )}
            </div>
          </div>
          <div className="mb-2">
            <div className="relative">
              <input
                id="landmark"
                className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                  formik.errors.landmark ? "border-red-500" : "border-gray-300"
                } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                type="text"
                placeholder=" "
                {...formik.getFieldProps("landmark")}
              />
              <label
                htmlFor="landmark"
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
              >
                Landmark (optional)
              </label>
            </div>
            {/* {formik.errors.landmark && (
              <div className="text-red-500 mt-1">{formik.errors.landmark}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label htmlFor="address_type" className="font-medium">
              Address Type:
            </label>
            <div className="mt-2 flex flex-wrap">
              <div className="mb-2 mr-4 flex items-center">
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
              <div className="mb-2 mr-4 flex items-center">
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
              <div className="mb-2 flex items-center">
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
            {/* {formik.errors.address_type && (
              <div className="text-red-500 mt-1">{formik.errors.address_type}</div>
            )} */}
          </div>
          <button
            type="submit"
            className={`my-2 inline-block w-full border border-transparent bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-center text-white hover:bg-rose-500 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
