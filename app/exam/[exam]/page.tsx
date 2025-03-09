import { WithSidebar } from "@/components/with-sidebar";
import Navbar from "@/components/navbar";
import { SidebarContent, CustomHeader } from "@/components/navigation/sidebar";
import Banner from "@/components/banner";
import { MainNav } from "@/components/main-nav";
import Exam from "./components/exam";
import {
  getFirstPublicDocument,
  getUserById,
} from "@/services/profileServices";
import getUser from "@/lib/get-user";

export default async function Exams({ params }: { params: { exam: string } }) {
  // const { userId } = useAuth();

  // console.log(userId);
  const user: any = await getUser();

  const me = (await getUserById(user.uid)) || {};

  const questions = await getFirstPublicDocument("questions", params.exam);
  if (!questions) {
    return <div>Exam not found</div>;
  }
  console.log("Exam Questions", questions);

  return (
    <WithSidebar
      sidebarContent={SidebarContent}
      mobileDashboardHeader={MainNav}
    >
      <div className="">
        <Navbar />
        {/* <Banner /> */}
        <Exam
          questions={questions?.questions}
          name={questions?.name}
          userId={user?.uid}
          user={me}
          code={params.exam}
        />
      </div>
    </WithSidebar>
  );
}
