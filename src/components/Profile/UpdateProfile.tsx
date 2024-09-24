import React, { useState } from "react";
import Sheet from "react-modal-sheet";
import { useFormik } from "formik";
import { useUser } from "@/context/UserContext";
import * as Yup from "yup";

interface FormValues {
  firstName: string | any;
  lastName: string | any;
  email: string | any;
  phone: string | any;
  altPhone: string | any;
  gender: string | any;
  gst_no: string | any;
  panNum: string | any;
  dobDay: string | any;
  dobMonth: string | any;
  dobYear: string | any;
  profilePicture: File | null;
}
interface Props {
    isClose:()=>void;
    isOpen:boolean;
}
const UpdateProfile:React.FC<Props> = ({
    isClose,
    isOpen
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState("");
  const { logOut, isLoggedIn, userDetails, addUserDetails } = useUser();

  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    altPhone: Yup.string().required("Alternate phone number is required"),
    gender: Yup.string().required("Gender is required"),
    dobDay: Yup.string().required("Day is required"),
    dobMonth: Yup.string().required("Month is required"),
    dobYear: Yup.string().required("Year is required"),
    // profilePicture: Yup.mixed(),
  });
  const dob = userDetails?.dob;
  const [dobYear, dobMonth, dobDay] = dob?.split("-") ?? ["", "", ""];

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsLoading(true);
    setFormError("");

    const formattedValues: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      altPhone: values.altPhone,
      gender: values.gender,
      gst_no:values.gst_no,
      panNum:values.panNum,
      dob: `${values.dobYear}-${values.dobMonth}-${values.dobDay}`,
      profile_picture: values.profilePicture,
    };

    try {
      await addUserDetails(formattedValues);
      resetForm();
    } catch (error) {
      setFormError(
        "An error occurred while submitting the form. Please try again later.",
      );
    } finally {
      setIsLoading(false);
      isClose();
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.firstname || "",
      lastName: userDetails?.lastname || "",
      email: userDetails?.email || "",
      phone: userDetails?.mobile_no || "",
      altPhone: userDetails?.altPhone || "",
      gender: userDetails?.gender || "",
      gst_no: userDetails?.gst_no || "",
      panNum: userDetails?.pan || "",
      dobDay,
      dobMonth,
      dobYear,
      profilePicture: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Sheet
      isOpen={isOpen}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <Sheet.Container>
        <Sheet.Header>
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <button
              onClick={isClose}
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
        <Sheet.Scroller>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid items-center gap-7 p-4 md:grid-cols-2">
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
                          event.currentTarget.files[0],
                        );
                      } else {
                        formik.setFieldValue("profilePicture", null);
                      }
                    }}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.profilePicture
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="profilePicture"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Profile Picture
                  </label>
                </div>
                {formik.errors.profilePicture && (
                  <div className="mt-1 text-red-500">
                    {formik.errors.profilePicture}
                  </div>
                )}
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    value={formik.values.firstName}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    First Name
                  </label>
                </div>
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    value={formik.values.lastName}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Last Name
                  </label>
                </div>
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                    value={formik.values.email}
                    className={`peer block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Email
                  </label>
                </div>
              </div>
              <div className="select-none">
                <div className="relative">
                  <input
                    id="phone"
                    type="text"
                    {...formik.getFieldProps("phone")}
                    value={formik.values.phone}
                    readOnly
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.phone ? "border-red-500" : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Phone
                  </label>
                </div>
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="altPhone"
                    type="text"
                    {...formik.getFieldProps("altPhone")}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.altPhone
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="altPhone"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Alternate Phone
                  </label>
                </div>
                {formik.errors.altPhone && (
                  <div className="mt-1 text-red-500">
                    {formik.errors.altPhone}
                  </div>
                )}
              </div>
              <div className="">
                <div className="relative">
                  <select
                    id="gender"
                    {...formik.getFieldProps("gender")}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.gender
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  >
                    <option value="" label="Select gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Gender
                  </label>
                </div>
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="gst_no"
                    type="text"
                    {...formik.getFieldProps("gst_no")}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.gst_no
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="gst_no"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    GST Number
                  </label>
                </div>
                {formik.errors.gst_no && (
                  <div className="mt-1 text-red-500">
                    {formik.errors.gst_no}
                  </div>
                )}
              </div>
              <div className="">
                <div className="relative">
                  <input
                    id="panNum"
                    type="text"
                    {...formik.getFieldProps("panNum")}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.panNum
                        ? "border-red-500"
                        : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="PanNum"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    PAN Number
                  </label>
                </div>
                {formik.errors.panNum && (
                  <div className="mt-1 text-red-500">
                    {formik.errors.panNum}
                  </div>
                )}
              </div>
              
              <div className="">
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                    value={formik.values.email}
                    className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                      formik.errors.email ? "border-red-500" : "border-gray-300"
                    } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                  >
                    Email
                  </label>
                </div>
                {formik.errors.email && (
                  <div className="mt-1 text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="dobDay"
                      type="text"
                      {...formik.getFieldProps("dobDay")}
                      className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.errors.dobDay
                          ? "border-red-500"
                          : "border-gray-300"
                      } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                    />
                    <label
                      htmlFor="dobDay"
                      className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      Day
                    </label>
                  </div>
                  {formik.errors.dobDay && (
                    <div className="mt-1 text-red-500">
                      {formik.errors.dobDay}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="dobMonth"
                      type="text"
                      {...formik.getFieldProps("dobMonth")}
                      className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.errors.dobMonth
                          ? "border-red-500"
                          : "border-gray-300"
                      } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                    />
                    <label
                      htmlFor="dobMonth"
                      className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      Month
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="dobYear"
                      type="text"
                      {...formik.getFieldProps("dobYear")}
                      className={`block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 ${
                        formik.errors.dobYear
                          ? "border-red-500"
                          : "border-gray-300"
                      } peer focus:border-rose-400 focus:outline-none focus:ring-0`}
                    />
                    <label
                      htmlFor="dobYear"
                      className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-rose-400"
                    >
                      Year
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`rounded-lg bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 text-white transition-colors hover:bg-rose-600 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </Sheet.Scroller>
      </Sheet.Container>
    </Sheet>
  );
};
export default UpdateProfile;
