import { useState } from "react";
import instance from "@/utils/axios";
import { baseUrl, gms } from "@/utils/constants";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const useEnroll = (setBackendMessage, setBackendError, setFlashType) => {
  const [loading, setLoading] = useState(false);
  const cookieToken = Cookies.get("localtoken");
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleEnroll = async (schemeType, amount) => {
    if (!isLoggedIn) {
      setLoading(true);
      localStorage.setItem("redirectPath", pathname);
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      setBackendError(null);
      const response = await instance.post(
        `${baseUrl}${gms}`,
        {
          schemeType,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );

      console.log("Enrollment successful", response.data);
      setBackendMessage(response.data.message);
      setFlashType("success");
    } catch (error) {
      console.error("Error during enrollment", error);
      setBackendError("Failed to enroll. Please try again later.");
      setFlashType("error");
    } finally {
      setLoading(false);
    }
  };

  return { handleEnroll, loading };
};

export default useEnroll;
