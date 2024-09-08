import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import InitiatePayment from "./components/page";
import getUser from "@/lib/get-user";
import { redirect } from "next/navigation";
import { getUserById } from "@/services/profileServices";
import { Suspense } from "react";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = await getUserById(user.user_id);

  console.log("Real_User", user);
  console.log("Real_Me", me);
  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={CustomHeader}
    >
      <div className="">
        <Navbar />
        <Banner />
        <Suspense fallback="">
          <InitiatePayment user={me} />
        </Suspense>
      </div>
    </WithSidebar>
  );
}
