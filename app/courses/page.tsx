import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import { MainNav } from "@/components/main-nav";
import { getUserById } from "@/services/profileServices";
import getUser from "@/lib/get-user";
import { redirect } from "next/navigation";
import Course from "./components/course";
export default async function Courses() {
  // const { userId } = useAuth();

  // console.log(userId);
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }
  const me = await getUserById(user?.user_id);

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        <Banner />
        <Course userCourseList={me} />
      </div>
    </WithSidebar>
  );
}
