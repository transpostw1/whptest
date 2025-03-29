import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useFormik } from "formik";
import Loader from "@/components/Other/Loader"
import { useUser } from "@/context/UserContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  gender: string;
  gst_no:string;
  pan:string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  profilePicture: File | null;
}

const AddDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { addUserDetails, userDetails, getUser, isLoggedIn } = useUser();
  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      altPhone: "",
      gender: "",
      gst_no: "",
      pan: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      profilePicture: null,
    },
    enableReinitialize: true, 
    onSubmit: async (values: FormValues) => {
      setIsLoading(true);
      setFormError("");

      let dob = null; 

      if (values.dobYear && values.dobMonth && values.dobDay) {
        dob = `${values.dobYear}-${values.dobMonth}-${values.dobDay}`;
      }

      const formattedValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        altPhone: values.altPhone,
        gender: values.gender,
        gst_no: values.gst_no,
        pan: values.pan,
        dob,
        profile_picture: values.profilePicture,
      };

      try {
        await addUserDetails(formattedValues);
        handleClose();
      } catch (error) {
        setFormError(
          "An error occurred while submitting the form. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });


  const dob = userDetails?.dob;
  const [dobYear, dobMonth, dobDay] = dob?.split("-") ?? ["", "", ""];

  
  useEffect(() => {
    if (userDetails && isOpen) {
      const dob = userDetails?.dob;
      const [dobYear = "", dobMonth = "", dobDay = ""] = dob?.split("-") || [];

      formik.setValues({
        firstName: userDetails.firstname || "",
        lastName: userDetails.lastname || "",
        email: userDetails.email || "",
        phone: userDetails.mobile_no || "",
        altPhone: userDetails.altPhone || "",
        gender: userDetails.gender || "",
        gst_no: userDetails.gst_no || "",
        pan: userDetails.pan || "",
        dobDay,
        dobMonth,
        dobYear,
        profilePicture: null,
      });
    }
  }, [isOpen, userDetails]);


  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full overflow-y-auto">
      <div className="bg-white p-4 sm:p-8 flex flex-col justify-between z-50  max-w-full sm:max-w-lg mx-4 max-h-[80vh] overflow-y-auto no-scrollbar">
     <div className="flex items-center justify-between mb-4">
     <h2 className="text-2xl font-semibold  text-[#e26178]">Edit Profile</h2>
        <button onClick={handleClose} className="self-end">
          <Icon.X size={25} />
        </button>
     </div>
     
        <form onSubmit={formik.handleSubmit}>
         
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
                      event.currentTarget.files.length > 0
                    ) {
                      formik.setFieldValue(
                        "profilePicture",
                        event.currentTarget.files[0]
                      );
                    } else {
                      formik.setFieldValue("profilePicture", null);
                    }
                  }}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none border-gray-300 focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Profile Picture
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                {...formik.getFieldProps("firstName")} // Bind values properly
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                  formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="firstName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                  First Name
                </label>
              </div>
              {formik.errors.firstName && (
                <div className="text-red-500 mt-1">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  value={formik.values.lastName}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Last Name
                </label>
              </div>
              {formik.errors.lastName && (
                <div className="text-red-500 mt-1">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  {...formik.getFieldProps("email")}
                  value={formik.values.email}
                  readOnly
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
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
            <div className="mb-4 select-none ">
              <div className="relative">
                <input
                  id="phone"
                  type="text"
                  {...formik.getFieldProps("phone")}
                  value={formik.values.phone}
                  readOnly
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-400 bg-transparent border appearance-none ${
                    formik.errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="phone"
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
                  id="altPhone"
                  type="text"
                  {...formik.getFieldProps("altPhone")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.altPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="altPhone"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Alternate Phone
                </label>
              </div>
              {formik.errors.altPhone && (
                <div className="text-red-500 mt-1">
                  {formik.errors.altPhone}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <select
                  id="gender"
                  {...formik.getFieldProps("gender")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.gender ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                >
                  <option value="" label="Select gender" />
                  <option value="male" label="Male" />
                  <option value="female" label="Female" />
                  <option value="other" label="Other" />
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
              <div className="relative">
                <input
                  id="gst_no"
                  type="text"
                  {...formik.getFieldProps("gst_no")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent  border appearance-none ${
                    formik.errors.gst_no
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="gst_no"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                 GST Number
                </label>
              </div>
              {formik.errors.gst_no && (
                <div className="text-red-500 mt-1">
                  {formik.errors.gst_no}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="pan"
                  type="text"
                  {...formik.getFieldProps("pan")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.pan
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="pan"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  PAN Number
                </label>
              </div>
              {formik.errors.pan && (
                <div className="text-red-500 mt-1">
                  {formik.errors.pan}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="aadhar"
                  type="text"
                  {...formik.getFieldProps("aadhar")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.aadhar
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="aadhar"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Aadhar Number
                </label>
              </div>
              {formik.errors.aadhar && (
                <div className="text-red-500 mt-1">
                  {formik.errors.aadhar}
                </div>
              )}
            </div>
          </div>
          <p className="my-4">Date of Birth</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            
            <div className="mb-4">
              
              <div className="relative">
                
                <input
                  id="dobDay"
                  type="text"
                  {...formik.getFieldProps("dobDay")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border appearance-none ${
                    formik.errors.dobDay ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobDay"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Day
                </label>
              </div>
              {formik.errors.dobDay && (
                <div className="text-red-500 mt-1">{formik.errors.dobDay}</div>
              )}
              
            </div>
            
            <div className="mb-4">
              
              <div className="relative">
                <input
                  id="dobMonth"
                  type="text"
                  {...formik.getFieldProps("dobMonth")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent  border appearance-none ${
                    formik.errors.dobMonth
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobMonth"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Month
                </label>
              </div>
              {formik.errors.dobMonth && (
                <div className="text-red-500 mt-1">
                  {formik.errors.dobMonth}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="dobYear"
                  type="text"
                  {...formik.getFieldProps("dobYear")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent  border appearance-none ${
                    formik.errors.dobYear ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobYear"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Year
                </label>
              </div>
              {formik.errors.dobYear && (
                <div className="text-red-500 mt-1">{formik.errors.dobYear}</div>
              )}
            </div>
          </div>
          {/* <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Select your date of birth"
      /> */}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white py-2 px-4  transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Add Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetailsModal;
