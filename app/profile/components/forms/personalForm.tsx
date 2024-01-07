"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
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

type Props = {
  setEdit: any;
  info: any;
};

const formSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().min(1),
  gender: z.string().optional(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  nationality: z.string().optional(),
  state: z.string().optional(),
  govt: z.string().optional(),
});

const PersonalForm = ({ setEdit, info }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: info.firstName || "",
      lastName: info.lastName || "",
      email: info.email || "",
      gender: info.gender || "",
      phone: info.phone || "",
      dob: info.dob || "",
      nationality: info.nationality || "",
      state: info.state || "",
      govt: info.govt || "",
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
      toast.success("Personal Information updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Origin</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="govt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Govt Area</FormLabel>
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

export default PersonalForm;
