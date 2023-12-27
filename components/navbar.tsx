import { MainNav } from "@/components/main-nav";
// import StoreSwitcher from "@/components/store-switcher";
import getUser from "@/lib/get-user";
import { getUserById, getUserDocuments } from "@/services/profileServices";
import { redirect } from "next/navigation";
import Nav from "./navigation/nav";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import AvatarComp from "./avatar";

const Navbar = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const stores = await getUserDocuments("store", user.uid);

  const me = await getUserById(user.uid);

  console.log("Me", me);

  return <Nav stores={stores} user={user} />;
};

export default Navbar;
