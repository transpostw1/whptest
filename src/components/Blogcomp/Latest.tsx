import React from "react";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "5 Mother's Day Gifts you can choose to Make Her Day Special!",
    date: "June 21, 2023",
    category: "Fashion",
    imageSrc: "/images/blog/Post1.png",
  },
  {
    id: 2,
    title: "5 Mother's Day Gifts you can choose to Make Her Day Special!",
    date: "June 21, 2023",
    category: "Fashion",
    imageSrc: "/images/blog/Post2.png",
  },
];
const Latest = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-medium text-start mb-4">
        Discover Our Latest Posts
      </h2>
      <p className="text-start mb-8">
        Where Passion Meets Precision. Explore Our Jewellery Blog for Insights
        and Inspiration on All Things Adornments.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              width={400}
              height={400}
              className="w-full  object-cover"
              src={post.imageSrc}
              alt={post.title}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold ">{post.title}</h3>
              <p className="text-sm mb-2">
                Gold rings have long been cherished as timeless pieces of
                jewellery, adorning the fingers of women for centuries. From
                simple bands to intricate designs embellished..
              </p>
              <div className="flex items-center gap-2 ">
                <span className="inline-block border border-pink-500 text-pink-500 text-xs px-2 py-1 rounded-xl">
                  {post.category}
                </span>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
