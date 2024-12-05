"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/Other/Loader";
import useEnroll from "@/hooks/useEnroll";

interface SchemeDetails {
  planName?: string;
  monthlyAmount?: number;
}

const PANVerificationPage: React.FC = () => {
  const [pan, setPan] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [panError, setPanError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"success" | "error" | null>(null);

  const router = useRouter();
  const { userDetails, addUserDetails } = useUser();

  const getSchemeDetails = (): SchemeDetails => {
    const schemeDetailsString = sessionStorage.getItem("selectedScheme");
    return schemeDetailsString ? JSON.parse(schemeDetailsString) : {};
  };

  useEffect(() => {
    if (userDetails) {
      setPan(userDetails.pan || "");
    }
  }, [userDetails]);

  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };
  const schemeDetails = getSchemeDetails();
  const handleEnrollSuccess = useCallback(
    (enrollmentId: number) => {
   
      // console.log(schemeDetails,"SCHEEMEDEETSSS")
      const updatedSchemeDetails = {
        ...schemeDetails,
        enrollmentId: enrollmentId,
      };

      sessionStorage.setItem(
        "selectedScheme",
        JSON.stringify(updatedSchemeDetails)
      );

      router.push("/digitalCheckout");
    },
    [router]
  );

  const { handleEnroll } = useEnroll({
    setBackendMessage,
    setBackendError,
    setFlashType,
    handleEnrollSuccess,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePAN(pan)) {
      setPanError("Invalid PAN format. It should match 'ABCDE1234F'.");
      return;
    }
    if (!termsAccepted) {
      setPanError("Please accept the terms and conditions.");
      return;
    }

    try {
      setPanError(null);
      setLoading(true);

      const schemeDetails = getSchemeDetails();

      const requestBody = {
        pan_number: pan,
        name: userDetails?.firstname || "",
      };
      const response = await fetch("/api/verifyPan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok || !result.verification_status) {
        throw new Error(result.error || "Failed to verify PAN.");
      }
      const enrollmentId = await handleEnroll(
        schemeDetails.planName,
        schemeDetails.monthlyAmount
      );

      if (enrollmentId) {
        handleEnrollSuccess(enrollmentId)
        // if (!userDetails?.pan) {
          await addUserDetails({ pan });
        // }
        setBackendMessage("PAN verified successfully");
        setFlashType("success");
        router.push("/digitalCheckout");
      }
    } catch (error: any) {
      console.error("Error verifying PAN:", error);

      setPanError(error.message || "An error occurred. Please try again.");
      setBackendError(error.message || "Verification failed");
      setFlashType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 md:p-10">
            {backendError && (
              <div className="mb-4 text-center text-red-500">
                {backendError}
              </div>
            )}
            {backendMessage && (
              <div className="mb-4 text-center text-green-500">
                {backendMessage}
              </div>
            )}

            <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Update PAN
            </h1>
            <p className="mb-4 text-center text-sm text-gray-600">
              Thank you for your interest in our services. Please update the PAN
              to proceed.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#bb547d] focus:ring-[#bb547d]"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-[#bb547d] hover:underline"
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>
              <div>
                <label
                  htmlFor="pan"
                  className="block text-sm font-medium text-gray-700"
                >
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pan"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="Enter PAN number"
                  maxLength={10}
                  className={`mt-1 block w-full rounded-md border px-4 py-2 text-gray-700 shadow-sm focus:ring-[#bb547d] ${
                    panError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#f05794]"
                  }`}
                />
                {panError && (
                  <p className="mt-1 text-sm text-red-500">{panError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-[#bb547d] via-[#9b5ba7] to-[#815fc8] px-4 py-2 font-semibold text-white focus:outline-none focus:ring-offset-2"
                disabled={!termsAccepted || !pan || loading}
              >
                Update and Verify
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PANVerificationPage;