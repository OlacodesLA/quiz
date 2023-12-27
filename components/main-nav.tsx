"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Links } from "./navigation/sidebar";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const name = Links.find((item) => pathname === item.href) || {
    href: "Error",
    name: "Error",
  };
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        key={name.href}
        href={name.href}
        className={cn(
          "text-3xl font-bold transition-colors hover:text-primary"
        )}
      >
        {pathname === name.href && <>{name.name}</>}
      </Link>
    </nav>
  );
}
