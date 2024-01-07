"use client";
import { useRouter } from "next/navigation";
import useWindowSize from "@/utils/size";
import { MainNav } from "../main-nav";
import MobileNavigation from "./mobile";
import AvatarComp from "../avatar";

const Nav = ({ stores, user }: any) => {
  const router = useRouter();

  const { isTablet } = useWindowSize({
    isMobile: 640, // Custom mobile breakpoint
    isTablet: 767, // Custom tablet breakpoint
  });

  return (
    <div>
      {isTablet ? (
        <div className="relative flex lg:hidden">
          <MobileNavigation />
        </div>
      ) : (
        <div className="border-b border-b-gray-200">
          <div className="flex justify-between items-center px-6">
            <div className="flex h-24 items-center ">
              {/* <StoreSwitcher items={stores} /> */}
              <MainNav />
            </div>
            <div className="">
              <AvatarComp user={user} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
