import React from "react";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  // Simple meta tag management without react-helmet-async
  React.useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
);

export default PageMeta;
