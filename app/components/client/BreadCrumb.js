"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title");

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c);
    return { href, label };
  });

  // Only push the query param title if it's not already in the last segment
  const lastSegment = segments[segments.length - 1] || "";
  if (
    titleParam &&
    decodeURIComponent(lastSegment).toLowerCase() !== titleParam.toLowerCase()
  ) {
    crumbs.push({
      href: "#",
      label: titleParam.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c),
    });
  }

  return (
    <nav className="px-6 py-4 rounded-xl mt-10 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-4 text-lg text-gray-600">
        <li>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Home
          </Link>
        </li>

        {crumbs.map(({ href, label }, idx) => (
          <li key={href + idx} className="flex items-center">
            <span className="mx-2 select-none text-gray-400">/</span>
            {idx === crumbs.length - 1 ? (
              <span
                className="text-gray-800 font-semibold"
                aria-current="page"
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
