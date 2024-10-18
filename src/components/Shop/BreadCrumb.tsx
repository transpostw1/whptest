import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const { url, pc } = router.query;

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];

    breadcrumbs.push({ label: "Home", href: "/" });

    breadcrumbs.push({ label: "Products", href: "/products" });

    if (url && typeof url === "string") {
      const category = url.split("-")[1]; // Assuming format is always 'c-category'
      if (category) {
        breadcrumbs.push({
          label: category.charAt(0).toUpperCase() + category.slice(1),
          href: `/products?url=${url}`,
        });
      }
    }
    if (pc && typeof pc === "string") {
      const collection = pc.replace("_", " ");
      breadcrumbs.push({
        label: collection.charAt(0).toUpperCase() + collection.slice(1),
        href: router.asPath,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-500">{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-blue-500 hover:underline"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
