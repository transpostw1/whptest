import React from "react";
import Image from "next/image";

interface Latest{
  blogData:any[]
}


const Latest: React.FC<Latest> = ({ blogData }) => {
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
          <a
            key={blog.id}
            href={blog.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <div
              key={blog.id}
              className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
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
          </a>
        ))}
      </div>
    </div>
  );
};

export default Latest;
