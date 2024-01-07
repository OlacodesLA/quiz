"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { usersCollectionRef } from "@/utils/users";
import { doc, updateDoc } from "firebase/firestore";

type Props = {
  setEdit: any;
  info: any;
};

const formSchema = z.object({
  institute: z.string().optional(),
  certificate: z.string().optional(),
  membership: z.string().optional(),
  membershipNumber: z.string().optional(),
});

const ProfessionalForm = ({ setEdit, info }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institute: info.institute || "",
      certificate: info.certificate || "",
      membership: info.membership || "",
      membershipNumber: info.membershipNumber || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // await updateStore(params.storeId, data);
      // Attach the user id to the user document
      const userDoc = doc(usersCollectionRef, info.userId);
      // Set the user
      console.log(data);
      await updateDoc(userDoc, {
        ...data,
      });
      setEdit(false);
      router.refresh();
      toast.success("Professional Qualifications updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full rounded-xl bg-white md:px-5 px-4 md:py-5 py-4  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            <FormField
              control={form.control}
              name="institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Institute</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Upload</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Grade Level</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Number</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-5">
            <Button
              variant="destructive"
              disabled={loading}
              className="ml-auto"
              onClick={() => setEdit(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={loading} className="ml-auto" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfessionalForm;
