"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import BookExchangeModal from "@/components/Other/BookExchangeModal";
import { useUser } from "@/context/UserContext";
import { useCategory } from "@/context/CategoryContex";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import FlashAlert from "@/components/Other/FlashAlert";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Extendedfooter from "./Extendedfooter";

const Footer = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);
  const [careerModal, setCareerModal] = useState<boolean>(false);
  const [phone, setphone] = useState("");
  const [type, setType] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<any>(null);
  const { setCustomcategory } = useCategory();
  const { isLoggedIn } = useUser();

  const handleCareerModal = () => {
    setCareerModal(false);
  };
  const handleOnClose = () => {
    setAppointmentModal(false);
  };
  const handleChange = (event: any) => {
    const { value } = event.target;
    // Optional: Add phone number validation logic here
    setphone(value);
  };

  const handleSubmit = async () => {
    event?.preventDefault();
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const CUSTOMER_SUBSCRIPTION = gql`
        mutation StoreCustomerSubscription(
          $customerPhone: CustomerPhoneInput!
        ) {
          StoreCustomerSubscription(customerPhone: $customerPhone) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: CUSTOMER_SUBSCRIPTION,
        variables: {
          customerPhone: { phone },
        },

        fetchPolicy: "no-cache",
      });
      if (data.StoreCustomerSubscription.code == 200) {
        setMessage(data.StoreCustomerSubscription.message);
        setType("success");
      } else {
        setMessage(data.StoreCustomerSubscription.message);
        setType("error");
      }
    } catch (error) {
      console.log("Error From Subscription", error);
      setMessage(error);
    }
  };
  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema, // Pass the validation schema
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit();
        setSubmitting(false);
      }, 400);
    },
  });

  const pathname = usePathname();
  if (pathname == "/checkout")
    return (
      <>
        <div id="footer" className="footer h-20 text-rose-950"></div>
      </>
    );

  return (
    <>
      <div id="footer" className="footer text-rose-950">
        <div className="footer-main bg-gray-50">
          <div className="container py-4">
            <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
              <div className="flex items-center gap-2">
                <Link href={"/"}>
                  <Image
                    src={"/images/other/main_logo.png"}
                    width={40}
                    height={40}
                    alt="80x80"
                    className="object-cover"
                  />
                </Link>
                <div>
                  <Link href={"/"}>
                    <Image
                      src={"/images/other/whp_name_logo.png"}
                      width={170}
                      height={80}
                      alt="80x80"
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div className="">
                <p>Crafting Timeless Elegance , One Jewel at a </p>
                <p> Time. Discover Your Statement Piece Today.</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 border-t py-[60px] lg:flex-row">
              <div className="company-infor">
                <div className="newsletter">
                  <div className="caption1 text-center font-semibold lg:text-start">
                    Subscribe for WhatsApp updates
                  </div>
                  <div className="input-block relative mt-2 h-[52px]">
                    <form
                      className="flex justify-center lg:justify-start"
                      action="post"
                      onSubmit={handleSubmit}
                    >
                      <div className="caption1">
                        <PhoneInput
                          country={"in"}
                          value={formik.values.phone}
                          onChange={(value) => {
                            setphone("+" + value);
                            formik.handleChange("phone")(value);
                          }}
                          inputStyle={{ width: "250px" }}
                          // containerClass="custom-phone-input"
                        />
                      </div>

                      <button
                        className="relative ms-[-2rem] flex items-center justify-center"
                        type="submit"
                      >
                        <Icon.ArrowRight size={24} color="#e26178" />
                      </button>
                    </form>
                  </div>
                  <div className="list-social mt-4 flex items-center justify-center gap-6 lg:justify-start">
                    <Link
                      href={"https://www.facebook.com/whpjewellers.india/"}
                      target="_blank"
                    >
                      {" "}
                      <Icon.FacebookLogo size={34} weight="light" />
                    </Link>
                    <Link
                      href={"https://www.youtube.com/@whpjewellers"}
                      target="_blank"
                    >
                      <Icon.YoutubeLogo size={34} weight="light" />
                    </Link>
                    <Link
                      href={"https://www.instagram.com/whpjewellers/?hl=en"}
                      target="_blank"
                    >
                      <Icon.InstagramLogo size={32} weight="light" />
                    </Link>
                    <Link href={"https://wa.me/917045613491"} target="_blank">
                      <Icon.WhatsappLogo size={34} weight="light" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col justify-center lg:flex-row">
                <div className="list-nav flex w-full flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex w-full flex-col items-center lg:items-start">
                    <div className="font-semibold">Important Links</div>

                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/about-whpjewellers"}
                    >
                      About Us
                    </Link>
                    {isLoggedIn ? (
                      <Link
                        className="caption1 has-line-before w-fit pt-2 duration-300"
                        href={"/profile"}
                      >
                        My Account
                      </Link>
                    ) : (
                      <Link
                        className="caption1 has-line-before w-fit pt-2 duration-300"
                        href={"/register"}
                      >
                        My Account
                      </Link>
                    )}

                    {isLoggedIn ? (
                      <Link
                        className="caption1 has-line-before w-fit pt-2 duration-300"
                        href={"/profile/customerOrders"}
                      >
                        Orders & Returns
                      </Link>
                    ) : (
                      <Link
                        className="caption1 has-line-before w-fit pt-2 duration-300"
                        href={"/register"}
                      >
                        Orders & Returns
                      </Link>
                    )}

                    {/* <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/faqs"}
                    >
                      FAQs
                    </Link> */}
                  </div>

                  {/* <div className="item flex w-full flex-col items-center lg:items-start">
                    <div className="font-semibold">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before w-fit duration-300"
                      href={{
                        pathname: "/products",
                        query: { url: "category-chain" },
                      }}
                      onClick={() => setCustomcategory("chain")}
                    >
                      Chains
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={{
                        pathname: "/products",
                        query: { url: "category-bangle" },
                      }}
                      onClick={() => setCustomcategory("bangle")}
                    >
                      Bangles
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={{ pathname: "/products", query: { url: "category-ring" } }}
                      onClick={() => setCustomcategory("ring")}
                    >
                      Rings
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={{
                        pathname: "/products",
                        query: { url: "category-necklace" },
                      }}
                      onClick={() => setCustomcategory("category-necklace")}
                    >
                      Necklaces
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={{
                        pathname: "/products",
                        query: { url: "category-stone" },
                      }}
                      onClick={() => setCustomcategory("stone")}
                    >
                      Stones
                    </Link>
                  </div> */}
                  <div className="item flex w-full flex-col items-center lg:items-start">
                    <div className="font-semibold">Customer Services</div>
                    <Link
                      className="caption1 has-line-before w-fit duration-300"
                      href={"/terms-and-condition"}
                    >
                      Terms & Conditions
                    </Link>
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"#!"}
                    >
                      Shipping
                    </Link> */}
                    <a
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/terms-and-condition#privacyPolicy"}
                    >
                      Privacy Policy
                    </a>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/terms-and-condition#returnandRefund"}
                    >
                      Returns & Refunds
                    </Link>
                    <div
                      className="caption1 has-line-before w-fit cursor-pointer pt-2 duration-300"
                      onClick={() => setAppointmentModal(true)}
                    >
                      Book, Exchange and Buyback
                    </div>
                    {appointmentModal && (
                      <BookExchangeModal
                        title={"Exchange and BuyBack"}
                        closeModal={handleOnClose}
                      />
                    )}
                  </div>
                  <div className="item flex w-full flex-col items-center lg:items-start">
                    {/* <div className="font-semibold">User Guide</div>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/diamondguide"}
                    >
                      Diamond Guide
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/gemstoneguide"}
                    >
                      Gemstone Guide
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href={"/preciousmetal"}
                    >
                      Precious Metal Guide
                    </Link> */}
                    <div className="font-semibold">Contact</div>
                    <Link
                      href="tel:1800222225"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mt-1 flex">
                        <span>1800-222-225</span>
                      </div>
                    </Link>
                    <Link
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=care@whpjewellers.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mt-1 flex">
                        <span>care@whpjewellers.in</span>
                      </div>
                    </Link>
                    <Link
                      className="caption1 has-line-before w-fit pt-2 duration-300"
                      href="/careers"
                    >
                      Careers
                    </Link>
                    {careerModal && (
                      <BookExchangeModal
                        title={"Careers"}
                        closeModal={handleCareerModal}
                      />
                    )}
                  </div>
                </div>
                {/* <div className="item flex flex-col lg:justify-start justify-center lg:items-start items-center mt-5 md:mt-0  ">
                  <div className="font-semibold">Contact</div>
                  <Link
                    href="tel:+91 1800-222-225"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mt-1 flex">
                      <span>1800-222-225</span>
                    </div>
                  </Link>
                  <Link
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=care@whpjewellers.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mt-1 flex">
                      <span>care@whpjewellers.in</span>
                    </div>
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="border-line flex items-center justify-center gap-5 border-t py-3 max-lg:flex-col max-lg:justify-center">
              <div className="left flex items-center gap-8">
                <div className="copyright caption1 text-secondary text-center">
                  ©2025 WHP Jewellers Ecommerce Private Limited.All Rights
                  Reserved.
                </div>
                <div className="select-block flex items-center gap-5 max-md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
        <Extendedfooter />
      </div>
      {message && <FlashAlert message={message} type={type} />}
    </>
  );
};

export default Footer;
