import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logout from "./logout";

export const WithMobileSidebar = ({
  children,
  sidebarContent: SidebarContent,
  mobileDashboardHeader: MobileDashboardHeader,
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
  mobileDashboardHeader?: () => JSX.Element;
}) => {
  return (
    <>
      <Sheet>
        <div className="mt-5 flex md:hidden">
          <div className="flex flex-1">
            {MobileDashboardHeader && <MobileDashboardHeader />}
          </div>
          <SheetTrigger className="absolute top-5  right-2">
            <MenuIcon size={24} className="mr-2" />
          </SheetTrigger>
        </div>
        <SheetContent className="bg-black" side="left">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      {children}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const WithDesktopSidebar = ({
  children,
  sidebarContent: SidebarContent,
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
}) => {
  return (
    // style used from here -> https://github.com/shadcn-ui/ui/blob/1cf5fad881b1da8f96923b7ad81d22d0aa3574b9/apps/www/app/docs/layout.tsx#L12
    <div className="mx-auto h-[3000px] flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)]  lg:grid-cols-[240px_minmax(0,1fr)] ">
      <div className="fixed bg-gray-950 text-gray-200 top-0 z-30  hidden h-screen w-full shrink-0 border-r md:sticky md:block">
        <div className="flex flex-col items-start font-fredoka font-light justify-between h-screen w-full ">
          <SidebarContent />
          <Logout />
        </div>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

export const WithSidebar = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
  mobileDashboardHeader?: () => JSX.Element;
}) => {
  return (
    <WithDesktopSidebar {...props}>
      <WithMobileSidebar {...props}>{children}</WithMobileSidebar>
    </WithDesktopSidebar>
  );
};
