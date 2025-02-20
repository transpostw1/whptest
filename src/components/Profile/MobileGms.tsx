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
        const cookieToken =
          typeof window !== "undefined"
            ? localStorage.getItem("localtoken")
            : null;
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
    const amountPaid = gms.transactionDetails.reduce(
      (sum: number, transaction: any) => sum + transaction.amount,
      0,
    );
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
      }),
    );
    router.push("/digitalCheckout");
  };

  const handleBackButton = () => {
    router.push("/profile");
  };

  if (loading) {
    return (
      <div className="loading-container flex h-full items-center justify-center">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50}  />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex">
        <div onClick={handleBackButton} className="mt-2">
          <Icon.CaretLeft size={15} />
        </div>
        <div className="flex w-full justify-between">
          <div className="text-[20px] font-bold">Your GMS payments</div>
          <div className="text-[20px] font-bold text-[#e26178] underline">
            <Link href={"/benefit"}>Know More</Link>
          </div>
        </div>
      </div>
      <div className="px-3">
        {data && data.length > 0 ? (
          data.map((gms: any, index: number) => {
            const isCompleted = gms.transactionDetails.length >= 11;
            return (
              <div key={index} className="mb-3 border">
                <div className="flex justify-between border-b px-2">
                  <div>
                    Date: {new Date(gms.enrollDate).toLocaleDateString()}
                  </div>
                  <div>{gms.schemeType}</div>
                </div>
                <div className="flex justify-between px-2">
                  <div>
                    Monthly Investment: ₹{gms.monthlyAmount.toLocaleString()}{" "}
                  </div>
                  <div>
                    Balance Amount: ₹{gms.balanceAmount.toLocaleString()}
                  </div>
                </div>
                {isCompleted ? (
                  <div>
                    <div className="my-2 mb-2 flex px-2 justify-center">
                      {Array.from({ length: 11 }).map((_, i) => {
                        const transaction = gms.transactionDetails[i];
                        const isPaid = transaction !== undefined;
                        const tooltipContent = isPaid
                          ? `Amount: ₹${transaction.amount.toLocaleString()}\nDate: ${new Date(parseInt(transaction.transactionDate)).toLocaleDateString()}`
                          : `Installment ${i + 1} (Pending)`;
                        return (
                          <div
                            key={i}
                            className={`mr-2 h-[8px] w-[15px] ${isPaid ? "bg-green-500" : "bg-[#929191]"} cursor-pointer`}
                            title={tooltipContent}
                          />
                        );
                      })}
                    </div>
                    <p className="px-2 text-green-500 text-center">
                      Your Monthly Scheme is Successfully Completed
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="px-2">Payment Status Tracking</p>
                    <div className="my-2 mb-2 flex px-2">
                      {Array.from({ length: 11 }).map((_, i) => {
                        const transaction = gms.transactionDetails[i];
                        const isPaid = transaction !== undefined;
                        const tooltipContent = isPaid
                          ? `Amount: ₹${transaction.amount.toLocaleString()}\nDate: ${new Date(parseInt(transaction.transactionDate)).toLocaleDateString()}`
                          : `Installment ${i + 1} (Pending)`;
                        return (
                          <div
                            key={i}
                            className={`mr-2 h-[8px] w-[15px] ${isPaid ? "bg-green-500" : "bg-[#929191]"} cursor-pointer`}
                            title={tooltipContent}
                          />
                        );
                      })}
                    </div>
                    <button
                      className="my-1 mr-2 bg-[#e26178] px-4 py-2 text-white"
                      onClick={() => handlePayNow(gms)}
                    >
                      Pay Now
                    </button>
                  </>
                )}
                <div
                  className="flex items-center justify-between border-t"
                  onClick={() => handleToggle(index)}
                >
                  <div className="font-semibold">Payment History</div>
                  <div>
                    <Icon.CaretDown />
                  </div>
                </div>
                {showAccordian === index && (
                  <div className="p-2">
                    {gms.transactionDetails.length > 0 ? (
                      gms.transactionDetails.map(
                        (transaction: any, tIndex: number) => (
                          <div key={tIndex} className="flex justify-between">
                            <span>₹{transaction.amount.toLocaleString()}</span>
                            <span>
                              {new Date(
                                parseInt(transaction.transactionDate),
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        ),
                      )
                    ) : (
                      <p>No transactions yet.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="my-10 text-center text-2xl font-semibold text-[#e26178]">
            No Active Gold Saving Scheme
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileGms;
