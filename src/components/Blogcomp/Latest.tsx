import React, { useState } from "react";
import Image from "next/image";

interface LatestProps {
  blogData: any[];
}

const Latest: React.FC<LatestProps> = ({ blogData }) => {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const handlePostClick = (blog: any) => {
    setSelectedPost(blog);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-medium text-start mb-4">
        Discover Our Latest Posts
      </h2>
      <p className="text-start mb-8">
        Where Passion Meets Precision. Explore Our Jewellery Blog for Insights
        and Inspiration on All Things Adornments.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {blogData.map((blog) => (
          <div key={blog.id} className="cursor-pointer">
            <div
              className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              onClick={() => handlePostClick(blog)}
            >
              <Image
                width={400}
                height={300}
                className="w-full h-[300px] object-cover object-center"
                src={blog.image}
                alt={blog.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold ">{blog.title}</h3>
                <p className="text-sm mb-2">{blog.metaTitle}</p>
                <div className="flex items-center gap-2 ">
                  <span className="inline-block border border-[#e26178] text-[#e26178] text-xs px-2 py-1 rounded-xl">
                    {blog.categoryName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center z-[1000] items-center">
          <div className="bg-white p-8 rounded-lg max-w-lg overflow-y-auto max-h-full">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold">{selectedPost.title}</h2>
            {/* Render the blog post content */}
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Latest;
