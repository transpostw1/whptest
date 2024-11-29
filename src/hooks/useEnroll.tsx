import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Props {
  setBackendMessage: (item: string) => void;
  setBackendError: (item: string) => void;
  setFlashType: (item: string) => void;
}

interface UseEnrollReturn {
  handleEnroll: (schemeType: string, amount: number) => Promise<number | null>;
  loading: boolean;
}

const useEnroll = ({
  setBackendMessage,
  setBackendError,
  setFlashType,
}: Props): UseEnrollReturn => {
  const [loading, setLoading] = useState(false);
  const cookieToken = typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleEnroll = async (
    schemeType: string,
    amount: number
  ): Promise<number | null> => {
    if (!isLoggedIn) {
      setLoading(true);
      localStorage.setItem("redirectPath", pathname);
      router.push("/register");
      return null;
    }

    try {
      setLoading(true);
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const ADD_CUSTOMER_GMS = gql`
        mutation StoreCustomerGMS($customerGms: CustomerGMSInput!) {
          StoreCustomerGMS(customerGMS: $customerGms) {
            message
            code
            enrollmentDetails {
              enrollmentId
              customerId
              schemeType
              monthlyAmount
              discountAmount
              balanceAmount
              totalAmount
              enrollDate
            }
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: ADD_CUSTOMER_GMS,
        variables: {
          customerGms: {
            schemeType: schemeType,
            amount: amount,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        },
        fetchPolicy: "no-cache",
      });

      if (data.StoreCustomerGMS.code === 200) {
        console.log("Enrollment successful", data.StoreCustomerGMS.message);
        setBackendMessage(data.StoreCustomerGMS.message);
        setFlashType("success");

        // Extract enrollmentId from the response
        const enrollmentId =
          data.StoreCustomerGMS.enrollmentDetails.enrollmentId;
        // console.log(enrollmentId);
        return enrollmentId;
      } else {
        console.log("Enrollment failed", data.StoreCustomerGMS.message);
        setBackendMessage(data.StoreCustomerGMS.message);
        setFlashType("error");
        return null;
      }
    } catch (error) {
      console.error("Error during enrollment", error);
      setBackendError("Failed to enroll. Please try again later.");
      setFlashType("error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleEnroll, loading };
};

export default useEnroll;