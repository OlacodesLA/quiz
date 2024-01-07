import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import { MainNav } from "@/components/main-nav";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        <Banner />
      </div>
    </WithSidebar>
  );
}
