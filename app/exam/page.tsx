import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import { MainNav } from "@/components/main-nav";
import Exam from "./components/exam";

export default function Exams() {
  // const { userId } = useAuth();

  // console.log(userId);

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        {/* <Banner /> */}
        <Exam />
      </div>
    </WithSidebar>
  );
}
