"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { graphqlbaseUrl } from "@/utils/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Props {
  handleComponent: (args: string) => void;
}

const MobileGms: React.FC<Props> = ({ handleComponent }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAccordian, setShowAccordian] = useState<number | null>(null);
  const [error, setError] = useState<any>();
  const router = useRouter();

  const handleToggle = (number: number) => {
    setShowAccordian(number === showAccordian ? null : number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cookieToken = typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;
        const getAuthHeaders = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };
        const link = new HttpLink({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
        });

        const client = new ApolloClient({
          link,
          cache: new InMemoryCache(),
        });

        const GET_GMS = gql`
          query GetCustomerGMS($token: String!) {
            getCustomerGMS(token: $token) {
              id
              customerId
              schemeType
              monthlyAmount
              discountAmount
              balanceAmount
              totalAmount
              enrollDate
              transactionDetails {
                id
                enrollmentID
                amount
                transactionDate
              }
            }
          }
        `;

        const variables = { token: cookieToken };
        const { data } = await client.query({
          query: GET_GMS,
          variables,
        });
        setData(data.getCustomerGMS);
      } catch (error) {
        console.error("Error fetching GMS:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePayNow = (gms: any) => {
    const amountPaid = gms.transactionDetails.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
    const installmentsPaid = gms.transactionDetails.length;
    const nextInstallmentAmount = gms.monthlyAmount;

    sessionStorage.setItem(
      "selectedScheme",
      JSON.stringify({
        enrollmentId: gms.id,
        planName: gms.schemeType,
        monthlyAmount: gms.monthlyAmount,
        totalAmount: gms.totalAmount,
        balanceAmount: gms.balanceAmount,
        amountPaid: amountPaid,
        installmentsPaid: installmentsPaid,
        nextInstallmentAmount: nextInstallmentAmount,
        iconUrl: `/images/${gms.schemeType.toLowerCase()}-icon.png`,
        schemeType: gms.schemeType,
      })
    );
    router.push("/digitalCheckout");
  };

  const handleBackButton = () => {
    router.push("/profile")
  };

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4">
        <div onClick={handleBackButton} className="mt-2">
          <Icon.CaretLeft size={15} />
        </div>
        <div className="flex justify-between w-full">
          <div className="text-[20px] font-bold">Your GMS payments</div>
          <div className="text-[20px] font-bold text-[#e26178] underline">
            <Link href={"/benefit"}>Know More</Link>
          </div>
        </div>
      </div>
      <div className="px-3">
        {data && data.length > 0 ? (
          data.map((gms: any, index: number) => (
            <div key={index} className="border mb-3">
              <div className="flex justify-between border-b px-2">
                <div>Date: {new Date(gms.enrollDate).toLocaleDateString()}</div>
                <div>{gms.schemeType}</div>
              </div>
              <div className="flex justify-between px-2">
                <div>Monthly Investment: ₹{gms.monthlyAmount.toLocaleString()} </div>
                <div>Balance Amount: ₹{gms.balanceAmount.toLocaleString()}</div>
              </div>
              <p className="px-2">Payment Status Tracking</p>
              <div className="flex mb-2 px-2 my-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const transaction = gms.transactionDetails[i];
                  const isPaid = transaction !== undefined;
                  const tooltipContent = isPaid
                    ? `Amount: ₹${transaction.amount.toLocaleString()}\nDate: ${new Date(parseInt(transaction.transactionDate)).toLocaleDateString()}`
                    : `Installment ${i + 1} (Pending)`;
                  return (
                    <div 
                      key={i} 
                      className={`mr-2 h-[8px] w-[15px] ${isPaid ? 'bg-green-500' : 'bg-[#929191]'} cursor-pointer`}
                      title={tooltipContent}
                    />
                  );
                })}
              </div>
              <button 
                className="px-4 py-2 bg-[#e26178] text-white my-1 mr-2"
                onClick={() => handlePayNow(gms)}
              >
                Pay Now
              </button>
              <div
                className="flex justify-between items-center border-t"
                onClick={() => handleToggle(index)}
              >
                <div>Payment History</div>
                <div>
                  <Icon.CaretDown />
                </div>
              </div>
              {showAccordian === index && (
                <div className="p-2">
                  {gms.transactionDetails.length > 0 ? (
                    gms.transactionDetails.map((transaction: any, tIndex: number) => (
                      <div key={tIndex} className="flex justify-between">
                        <span>₹{transaction.amount.toLocaleString()}</span>
                        <span>{new Date(parseInt(transaction.transactionDate)).toLocaleDateString()}</span>
                      </div>
                    ))
                  ) : (
                    <p>No transactions yet.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center font-semibold text-2xl my-10 text-[#e26178]">
            No Active Gold Saving Scheme
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileGms;