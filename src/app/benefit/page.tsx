"use client";
import React, { useState, useEffect } from "react";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";
import FlashAlert from "@/components/Other/FlashAlert";
import MobileBenefits from "./mobileBenefits";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

interface GmsROI {
  id: string;
  type: string;
  percentage: number;
}

const GET_GMS_ROI = gql`
  query GetGmsROI {
    getGmsROI {
      id
      type
      percentage
    }
  }
`;

const Benefit: React.FC = () => {
  const [cardArray, setCardArray] = useState<number[]>([1, 2, 3]);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"success" | "error" | "info">(
    "success",
  );
  const [ROIData, setROIData] = useState<GmsROI[] | null>(null);

  const nextCard = (index: number): void => {
    setCardArray((prevArray) => {
      const newArray = [
        ...prevArray.slice(index),
        ...prevArray.slice(0, index),
      ];
      return newArray;
    });
  };
  const getPercentageByType = (type: string) => {
    if (!ROIData) return 0;
    const roiItem = ROIData.find((item: any) => item.type === type);
    return roiItem ? roiItem.percentage : 0;
  };

  const getCard = (card: number) => {
    switch (card) {
      case 1:
        return (
          <GoldCard
            percentage={getPercentageByType("Gold")}
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      case 2:
        return (
          <DiamondCard
            percentage={getPercentageByType("Diamond")}
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      case 3:
        return (
          <SilverCard
            percentage={getPercentageByType("Silver")}
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      default:
        return null;
    }
  };

  const fetchGmsROIData = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_GMS_ROI,
      });

      setROIData(data.getGmsROI);
      console.log(data.getGmsROI, "GMS ROI data fetched");
    } catch (error) {
      console.error("Error fetching GMS ROI data", error);
    }
  };

  useEffect(() => {
    fetchGmsROIData();
  }, []);

  useEffect(() => {
    if (backendMessage || backendError) {
      const timer = setTimeout(() => {
        setBackendMessage(null);
        setBackendError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [backendMessage, backendError]);

  return (
    <>
      <div className="hidden px-40 md:h-[900px] md:px-10 lg:block lg:h-[600px]">
        <div className="card-stack">
          {cardArray.map((card, index) => (
            <div
              className={`card card${index + 1} rounded-lg`}
              key={card}
              onClick={() => nextCard(index)}
            >
              {getCard(card)}
            </div>
          ))}
        </div>
      </div>
      <MobileBenefits
        ROIData={ROIData} 
        setBackendMessage={setBackendMessage}
        setBackendError={setBackendError}
        setFlashType={setFlashType}
      />
      {(backendMessage || backendError) && (
        <FlashAlert message={backendMessage || backendError} type={flashType} />
      )}
    </>
  );
};

export default Benefit;
