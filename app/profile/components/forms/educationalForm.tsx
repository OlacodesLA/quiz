"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { usersCollectionRef } from "@/utils/users";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type Props = {
  setEdit: any;
  info: any;
};

const formSchema = z.object({
  schools: z.string().optional(),
  year: z.string().optional(),
  certificateAward: z.string().optional(),
  qualifications: z.string().optional(),
});

const EducationalForm = ({ setEdit, info }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schools: info.schools || "",
      year: info.year || "",
      certificateAward: info.certificateAward || "",
      qualifications: info.qualifications || "",
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
      toast.success("Educational Background updated");
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
              name="schools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Schools Attended</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Started / Year Graduated</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificateAward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Awarded with Date</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Qualifications</FormLabel>
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

export default EducationalForm;
