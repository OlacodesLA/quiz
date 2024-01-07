import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import ProfileUI from "./components/profileui";
import getUser from "@/lib/get-user";
import { getUserById } from "@/services/profileServices";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/main-nav";

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = (await getUserById(user.uid)) || {};

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        <ProfileUI user={me} />
      </div>
    </WithSidebar>
  );
}
