"use client";
import React,{useState} from 'react';
import { useBlog } from '@/context/BlogContext';
import Loader from '@/components/Other/Loader';
import ApplyForm from '../applyForm';

interface JobDetail {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  addDate: string;
  location: string[];
}

const CareerDetail: React.FC = () => {
  const { careersData, selectedUrl, loading } = useBlog();
  const [showModal, setShowModal] = useState(false);
  console.log(careersData, selectedUrl, "consoleee");


  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Find the job that matches the selected URL
  const jobDetail = careersData.find((job: JobDetail) => job.url === selectedUrl);
  

  if (loading) {
    return (
      <Loader/>
    )
  }

  if (!jobDetail) {
    return <p>No job details found for the selected one.</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="border-b py-2 mb-4 bg-gray-100 md:px-10 px-1">
        <h1 className="text-2xl font-bold">{jobDetail.title}</h1>
        <div className="flex flex-wrap gap-2 text-gray-600 mt-2">
          <span>Retail - Direct Store</span>
          <span>📍 {jobDetail.location.join(', ')}</span>
          <span>📅 {jobDetail.addDate}</span>
        </div>
        <button className="mt-4 px-4 py-2 w-24 bg-[#e26178] text-white font-semibold rounded hover:bg-[#e63d5c]"  onClick={openModal}>
          APPLY 
        </button>
        {/* <div className="flex gap-2 items-center mt-4">
          <span>Share this Job:</span>
        </div> */}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:mx-10 mx-1">
        <div className="flex-1 text-justify">
          {/* <h2 className="text-xl font-semibold mb-2">Job Description</h2> */}
          <div className="prose">
            <p dangerouslySetInnerHTML={{ __html: jobDetail.content }}></p>
          </div>
        </div>
      </div>
      {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-opacity-50 backdrop-blur-sm">
              <div className="w-full max-w-md overflow-x-hidden rounded-xl bg-gray-300 p-3">
                <ApplyForm closeModal={closeModal} />
              </div>
            </div>
          )}
    </div>
  );
};

export default CareerDetail;