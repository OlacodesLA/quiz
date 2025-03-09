"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Links } from "./navigation/sidebar";
import { Heading } from "./ui/heading";

export const MainNav = () => {
  const pathname = usePathname();

  const name = Links.find((item) => pathname.includes(item.href)) || {
    href: "/dashboard",
    name: "Dashboard",
    description: "Dashboard",
  };

  return (
    <nav
      className={cn("flex  items-center space-x-4 lg:space-x-6 md:px-0 px-6")}
    >
      <Link
        key={name.href}
        href={name.href}
        className={cn(" transition-colors hover:text-primary")}
      >
        <Heading
          title={(pathname === name.href && name.name) || ""}
          description={name.description || ""}
          className="font-fredoka font-semibold"
        />
      </Link>
    </nav>
  );
};
