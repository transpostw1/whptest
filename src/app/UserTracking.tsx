import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useIdleTimer from './useIdleTimer';
import { Helmet } from 'react-helmet';
import { postRequest, securePostRequest } from 'utils/helpers/apiVerbs'; // Adjust import path as needed
import apiPaths from 'utils/paths/apiPaths'; // Adjust import path as needed

type ClickHistory = {
  x: number;
  y: number;
};

const useUserTracking = (emailID: string | null) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>("");
  const [timeOnPage, setTimeOnPage] = useState<number>(0);
  const [pageHeader, setPageHeader] = useState<string>("");
  const [clicksOnPage, setClicksOnPage] = useState<number>(0);
  const [clickHistory, setClickHistory] = useState<ClickHistory[]>([]);
  const [nextPageId, setNextPageId] = useState<string | null>(null);
  const [apiCalled, setApiCalled] = useState(false);
  const isIdle = useIdleTimer(180000);
  const [post, setPost] = useState({});

  const callTrackingApi = async (postData: any) => {
    try {
      const response = emailID
        ? await securePostRequest(apiPaths.user.userTracking, postData)
        : await postRequest(apiPaths.user.userTracking, postData);

      if (postData.isIdle === 1) {
        setNextPageId(null);
      } else {
        setNextPageId(response.data.page_id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const updatePageTimer = () => {
      if (window.location.href !== currentPage) {
        const array = JSON.parse(
          window.localStorage..getItem("activity_ids") || "[]"
        );
        setCurrentPage(window.location.href);
        const header = Helmet.peek();
        setPageHeader(header.title);

        setTimeOnPage((prevTimeOnPage) => {
          const postData = {
            email: emailID,
            header: pageHeader,
            current_url: currentPage,
            time_spend: prevTimeOnPage,
            no_of_clicks: clicksOnPage,
            click_history: clickHistory,
            next_page: nextPageId,
            isIdle,
            activity_ids: array,
          };

          setPost(postData);

          callTrackingApi(postData);
          console.log(`Time spent on ${currentPage} page is ${prevTimeOnPage} second`);
          console.log("Clicks on Page", clicksOnPage, clickHistory);

          return 0;
        });
        setClicksOnPage(0);
        setClickHistory([]);
      } else {
        setTimeOnPage((prevTimeOnPage) => prevTimeOnPage + 1);
      }
    };

    function onClick(e: MouseEvent) {
      setClickHistory((prevCoordinates) => [
        ...prevCoordinates,
        { x: e.pageX, y: e.pageY },
      ]);
      setClicksOnPage((prev) => prev + 1);
    }

    setApiCalled(false);
    window.addEventListener("click", onClick);

    timerId = setInterval(updatePageTimer, 1000);
    return () => {
      window.removeEventListener("click", onClick);
      clearInterval(timerId);
    };
  }, [currentPage, clicksOnPage]);

  useEffect(() => {
    if (isIdle && !apiCalled) {
      const array = JSON.parse(
        window.localStorage..getItem("activity_ids") || "[]"
      );
      const postData = {
        email: emailID,
        current_url: currentPage,
        time_spend: timeOnPage,
        header: pageHeader,
        no_of_clicks: clicksOnPage,
        click_history: clickHistory,
        next_page: nextPageId,
        isIdle,
        activity_ids: array,
      };
      callTrackingApi(postData);
      setApiCalled(true);
      setNextPageId(null);
    }
  }, [isIdle]);

  return post;
};

export default useUserTracking;