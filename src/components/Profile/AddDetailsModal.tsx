import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string(),
    alternatePhone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date(),
    profilePicture: Yup.mixed().required("Profile picture is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    setFormError("");

    try {
      console.log("inisideeeee");
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      onClose();
      formik.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      alternatePhone: "",
      gender: "",
      dateOfBirth: "",
      profilePicture: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-4 sm:p-8 flex flex-col justify-between z-50 rounded-xl max-w-full sm:max-w-lg mx-4 max-h-[80vh] overflow-y-auto no-scrollbar">
        <button onClick={onClose} className="self-end">
          <Icon.X size={25} />
        </button>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          {formError && <div className="text-red-500 mb-4">{formError}</div>}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (
                      event.currentTarget.files &&
                      event.currentTarget.files[0]
                    ) {
                      formik.setFieldValue(
                        "profilePicture",
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.profilePicture
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Profile Picture
                </label>
              </div>
              {formik.errors.profilePicture && (
                <div className="text-red-500 mt-1">
                  {formik.errors.profilePicture}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="firstname"
                  // name="firstname"
                  type="text"
                  {...formik.getFieldProps("firstname")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.firstname
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="firstname"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  First Name
                </label>
              </div>
              {formik.errors.firstname && (
                <div className="text-red-500 mt-1">
                  {formik.errors.firstname}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="lastname"
                  // name="lastname"
                  type="text"
                  {...formik.getFieldProps("lastname")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.lastname
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="firstname"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Last Name
                </label>
              </div>
              {formik.errors.firstname && (
                <div className="text-red-500 mt-1">
                  {formik.errors.firstname}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="email"
                  // name="firstname"
                  type="text"
                  {...formik.getFieldProps("email")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
              </div>
              {formik.errors.email && (
                <div className="text-red-500 mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="phone"
                  // name="firstname"
                  type="text"
                  {...formik.getFieldProps("phone")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="firstname"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Phone
                </label>
              </div>
              {formik.errors.phone && (
                <div className="text-red-500 mt-1">{formik.errors.phone}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="alternatePhone"
                  // name="firstname"
                  type="text"
                  {...formik.getFieldProps("alternatePhone")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.alternatePhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="alternatePhone"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Alternate phone
                </label>
              </div>
              {formik.errors.alternatePhone && (
                <div className="text-red-500 mt-1">
                  {formik.errors.alternatePhone}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <select
                  id="gender"
                  // name="gender"
                  {...formik.getFieldProps("gender")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.gender ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <label
                  htmlFor="gender"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Gender
                </label>
              </div>
              {formik.errors.gender && (
                <div className="text-red-500 mt-1">{formik.errors.gender}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative flex">
                <div className="mr-2">
                  <select
                    id="dateOfBirth"
                    // name="dobDay"
                    {...formik.getFieldProps("dateOfBirth")}
                    className={`block px-2.5 pb-2.5 pt-4 w-16 text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                      formik.errors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="dateOfBirth"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Day
                  </label>
                </div>
                <div className="mr-2">
                  <select
                    id="dobMonth"
                    // name="dobMonth"
                    {...formik.getFieldProps("dobMonth")}
                    className={`block px-2.5 pb-2.5 pt-4 w-24 text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                      formik.errors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="dobMonth"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Month
                  </label>
                </div>
                <div>
                  <select
                    id="dobYear"
                    // name="dobYear"
                    {...formik.getFieldProps("dobYear")}
                    className={`block px-2.5 pb-2.5 pt-4 w-24 text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                      formik.errors.dobYear
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                  >
                    <option value="">Year</option>
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="dobYear"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Year
                  </label>
                </div>
              </div>
              {/* {(formik.errors.dobDay ||
                formik.errors.dobMonth ||
                formik.errors.dobYear) && (
                <div className="text-red-500 mt-1">
                  {formik.errors.dobDay ||
                    formik.errors.dobMonth ||
                    formik.errors.dobYear}
                </div>
              )} */}
            </div>
          </div>
          <button
            type="submit"
            className={`my-2 px-4 py-2 text-center w-full inline-block text-white bg-rose-400 border border-transparent rounded-md hover:bg-rose-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsModal;
