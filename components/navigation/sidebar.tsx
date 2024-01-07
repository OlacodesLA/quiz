"use client";
import { usePathname } from "next/navigation";
import {
  BookText,
  User,
  Home as HomeIcon,
  Banknote,
  PenLine,
} from "lucide-react";
import Link from "next/link";

export const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="w-full my-6 text-white">
      <CustomHeader />
      <div className="mt-12 flex flex-col items-start gap-3 w-full">
        {Links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`relative flex w-full items-center gap-4 rounded px-6 py-2.5 transition duration-200 hover:bg-blue-950 `}
          >
            {pathname === item.href ? <>{item.activeIcon}</> : <>{item.icon}</>}
            <div
              className={` tracking-wider ${
                pathname === item.href
                  ? "text-white font-medium"
                  : "text-gray-300 font-light"
              }`}
            >
              {item.name}
            </div>
            {pathname === item.href && (
              <div className="absolute right-0 w-2 h-full bg-gray-100 rounded-lg"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const CustomHeader = () => {
  return (
    <div className="flex px-6">
      <span className="text-2xl font-extrabold">Quiz</span>
    </div>
  );
};

const activeIconClass = "text-2xl text-white ";
const iconClass = "text-2xl text-gray-300 ";

export const Links = [
  {
    name: "Dashboard",
    href: "/",
    activeIcon: <HomeIcon className={activeIconClass} />,
    icon: <HomeIcon className={iconClass} />,
  },
  {
    name: "Exam",
    href: "/exam",
    activeIcon: <PenLine className={activeIconClass} />,
    icon: <PenLine className={iconClass} />,
  },
  {
    name: "Courses",
    href: "/courses",
    activeIcon: <BookText className={activeIconClass} />,
    icon: <BookText className={iconClass} />,
  },
  {
    name: "Payment",
    href: "/payment",
    activeIcon: <Banknote className={activeIconClass} />,
    icon: <Banknote className={iconClass} />,
  },
  {
    name: "Profile",
    href: "/profile",
    activeIcon: <User className={activeIconClass} />,
    icon: <User className={iconClass} />,
    description: "Customize your profile for a personalized experience.",
  },
];
