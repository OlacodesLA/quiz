import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { BookText, PenLine, TrendingUp } from "lucide-react";
import getUser from "@/lib/get-user";
import { getUserById } from "@/services/profileServices";
import { redirect } from "next/navigation";

type Props = {};

const OverviewCard = async (props: Props) => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = await getUserById(user.uid);

  console.log("me", me);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3 mx-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Level</CardTitle>
          <TrendingUp />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{me?.level}</div>
          <p className="text-xs text-muted-foreground">
            4 more levels to Graduate
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Exams Completed</CardTitle>
          <PenLine />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            You have completed 0 exams
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Courses Paid</CardTitle>
          <BookText />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            You have 0 courses paid
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCard;
