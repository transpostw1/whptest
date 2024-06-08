// BlogPostPage.tsx

import React from "react";

interface BlogPostPageProps {
  content: string;
}

const Blogpost: React.FC<BlogPostPageProps> = ({ content }) => {
  return (
    <div>
      
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Blogpost;
