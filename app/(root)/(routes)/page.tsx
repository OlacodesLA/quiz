import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import { MainNav } from "@/components/main-nav";
import Banner from "@/components/banner";
import OverviewCard from "@/components/overview";
import getUser from "@/lib/get-user";
import { getUserById } from "@/services/profileServices";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = await getUserById(user.uid);
  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        <Banner />
        <OverviewCard me={me} />
      </div>
    </WithSidebar>
  );
}
