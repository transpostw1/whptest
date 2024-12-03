"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/Other/Loader";
import { gql, ApolloClient,InMemoryCache } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

const VERIFY_PAN = gql`
  mutation verifyPAN($verifyPanInput: CheckCustomerVerifiedInput!) {
    verifyPAN(verifyPanInput: $verifyPanInput) {
      success
      message
    }
  }
`;

const Page: React.FC = () => {
  const [pan, setPan] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [panError, setPanError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetails, addUserDetails } = useUser();
  const client = new ApolloClient({
    uri: graphqlbaseUrl,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (userDetails) {
      setPan(userDetails.pan || "");
    }
  }, [userDetails]);

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePAN(pan)) {
      setPanError("Invalid PAN format. It should match 'ABCDE1234F'.");
      return;
    }

    try {
      setPanError(null);
      setLoading(true);

      const { data } = await client.mutate({
        mutation: VERIFY_PAN,
        variables: {
          verifyPanInput: {
            pan_number: pan,
            name: userDetails?.firstname,
          },
        },
        fetchPolicy: "no-cache",
      });

      const { success, message } = data.verifyPAN;

      if (!success) {
        throw new Error(message || "Failed to verify PAN.");
      }
      sessionStorage.setItem("schemeDetails", JSON.stringify({ pan }));
      await addUserDetails({ pan:pan });
      router.push("/digitalCheckout");
    } catch (error: any) {
      console.error("Error verifying PAN:", error);
      setPanError(error.message || "An error occurred. Please try again.");
    } finally {
      router.push("/digitalCheckout");
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
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Update PAN
            </h1>
            <p className="mb-4 text-center text-sm text-gray-600">
              Thank you for your interest in our services. Please update the PAN to proceed.
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
                  <a href="#" className="font-medium text-[#bb547d] hover:underline">
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

export default Page;
