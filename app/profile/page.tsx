import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";

export default function Home() {
  // const { userId } = useAuth();

  // console.log(userId);

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={CustomHeader}
    >
      <div className="">
        <Navbar />
        <Banner />
      </div>
    </WithSidebar>
  );
}
