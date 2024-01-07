import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import { MainNav } from "@/components/main-nav";

export default function Courses() {
  // const { userId } = useAuth();

  // console.log(userId);

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
