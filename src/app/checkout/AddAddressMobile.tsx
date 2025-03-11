import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sheet from "react-modal-sheet";
import Select from "react-select";
import { Address } from "@/type/AddressType";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isForBillingAddress: boolean;
  onAddressAdded: (isForBillingAddress: boolean) => void;
}

const AddAddressMobile: React.FC<Props> = ({
  isOpen,
  onClose,
  isForBillingAddress,
  onAddressAdded,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
        const countryData = response.data.data.map((country: any) => ({
          label: country.name,
          value: country.name,
          states: country.states.map((state: any) => ({ label: state.name, value: state.name })),
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (selectedOption: any) => {
    const selectedCountry = countries.find(
      (country) => country.value === selectedOption.value
    );
    setStates(selectedCountry ? selectedCountry.states : []);
    formik.setFieldValue("country", selectedOption.value);
    formik.setFieldValue("state", ""); // Reset state when country changes
  };

  const handleStateChange = (selectedOption: any) => {
    formik.setFieldValue("state", selectedOption.value);
  };

  const validationSchema = Yup.object().shape({
    pincode: Yup.string().required("Pincode is required"),
    full_address: Yup.string().required("Full address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address_type: Yup.string().required("Address type is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    setFormError("");

    try {
      const cookieToken =
        typeof window !== "undefined"
          ? localStorage.getItem("localtoken")
          : null;

      if (!cookieToken) {
        throw new Error("Authorization token is missing.");
      }

      const getAuthHeaders = () => ({
        authorization: `Bearer ${cookieToken}`,
      });

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const ADD_CUSTOMER_ADDRESS = gql`
        mutation AddCustomerAddresses(
          $customerAddresses: [AddCustomerAddressesInput!]!
        ) {
          AddCustomerAddresses(customerAddresses: $customerAddresses) {
            message
          }
        }
      `;

      console.log("Submitting values to API:", values);

      const { data, errors } = await client.mutate({
        mutation: ADD_CUSTOMER_ADDRESS,
        variables: {
          customerAddresses: [
            {
              address_type: values.address_type,
              full_address: values.full_address,
              country: values.country,
              state: values.state,
              city: values.city,
              pincode: values.pincode,
              landmark: values.landmark,
            },
          ],
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });

      if (errors) {
        console.error("GraphQL Errors:", errors);
        throw new Error("Failed to add address.");
      }

      onClose();
      console.log("Response from API:", data);
      onAddressAdded(isForBillingAddress);
      formik.resetForm();
    } catch (error: any) {
      console.error("Error:", error.message);
      setFormError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.9]} initialSnap={0}>
      <Sheet.Container style={{ borderRadius: 0 }}>
        <Sheet.Header>
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-lg font-semibold">
              {isForBillingAddress ? "Add Billing Address" : "Add Shipping Address"}
            </h2>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <Sheet.Scroller>
            <div className="p-2">
              {formError && (
                <div className="mb-4 text-red-500">{formError}</div>
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="full_address"
                      className={`block w-full appearance-none border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.touched.full_address && formik.errors.full_address
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
                  {formik.touched.full_address && formik.errors.full_address && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.full_address}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="pincode"
                      className={`block w-full appearance-none  border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.touched.pincode && formik.errors.pincode
                          ? "border-red-500"
                          : "border-gray-300"
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
                  {formik.touched.pincode && formik.errors.pincode && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.pincode}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <Select
                      id="country"
                      className="block w-full appearance-none  bg-transparent  text-sm text-gray-900"
                      value={countries.find(
                        (country) => country.value === formik.values.country
                      )}
                      onChange={handleCountryChange}
                      options={countries}
                      placeholder="Select country"
                    />
                    <label
                      htmlFor="country"
                      className="absolute left-1 top-2  origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      Country
                    </label>
                  </div>
                  {formik.touched.country && formik.errors.country && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.country}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <Select
                      id="state"
                      className="block w-full appearance-none  bg-transparent   text-sm text-gray-900"
                      value={states.find(
                        (state) => state.value === formik.values.state
                      )}
                      onChange={handleStateChange}
                      options={states}
                      placeholder="Select state"
                      isDisabled={!states.length}
                    />
                    <label
                      htmlFor="state"
                      className="absolute left-1 top-2  origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      State
                    </label>
                  </div>
                  {formik.touched.state && formik.errors.state && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.state}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="city"
                      className={`block w-full appearance-none  border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("city")}
                    />
                    <label
                      htmlFor="city"
                      className="absolute left-1 top-2  origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      City
                    </label>
                  </div>
                  {formik.touched.city && formik.errors.city && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.city}
                    </div>
                  )}
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
                  {formik.touched.address_type && formik.errors.address_type && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.address_type}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`my-2 inline-block w-full  border border-transparent bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-center text-white hover:bg-rose-500 ${
                    isLoading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Add"}
                </button>
              </form>
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default AddAddressMobile;