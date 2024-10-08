//@ts-nocheck
import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import { MainNav } from "@/components/main-nav";
import Exam from "./components/exam";
import getUser from "@/lib/get-user";
import { getUserById } from "@/services/profileServices";
import { redirect } from "next/navigation";

export default async function Exams() {
  // const { userId } = useAuth();

  // console.log(userId);
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = await getUserById(user.uid);
  console.log("me", me);

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        <Banner />
        <Exam user={me} />
      </div>
    </WithSidebar>
  );
}
