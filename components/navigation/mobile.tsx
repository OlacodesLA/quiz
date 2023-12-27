"use client";
import Link from "next/link";
import React from "react";
import { Home, User, BookText } from "lucide-react";

import { usePathname } from "next/navigation";

type Props = {};

const activeIconClass = "text-2xl text-darkblue ";
const iconClass = "text-2xl text-gray-500 ";

const MobileNavigation = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="fixed w-screen left-0 bottom-4 px-2  z-40 ">
      <div className="flex w-full px-4 bg-white shadow-gray-300   shadow-md justify-between items-center py-4 rounded-lg">
        {Links.map((a: any) => {
          return (
            <div key={a.href} className="relative">
              <Link href={a.href}>
                <button
                  className={` ${
                    pathname === a.href
                      ? "text-gold after:w-2 after:left-1/2  after:-translate-x-[50%] after:flex after:justify-center after:items-center  after:absolute after:content-['']  after:h-2 after:rounded-full after:bg-gradient-to-r from-gray-900 to-gray-900 after:mt-2"
                      : "text-gray-600"
                  }`}
                >
                  {pathname === a.href ? <>{a.activeIcon}</> : <>{a.icon}</>}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;

export const Links = [
  {
    name: "Home",
    href: "/",
    activeIcon: <Home className={activeIconClass} />,
    icon: <Home className={iconClass} />,
  },
  {
    name: "exam",
    href: "/exam",
    activeIcon: <BookText className={activeIconClass} />,
    icon: <BookText className={iconClass} />,
  },
  {
    name: "Pack",
    href: "/pack",
    activeIcon: <BookText className={activeIconClass} />,
    icon: <BookText className={iconClass} />,
  },
  {
    name: "Profile",
    href: "/profile",
    activeIcon: <User className={activeIconClass} />,
    icon: <User className={iconClass} />,
  },
];
