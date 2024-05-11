"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadImage } from "@/helpers/Upload";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Edit, Loader2, PlusCircle, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string().max(160).min(4),
  img: z
    .array(
      z.object({
        value: z.any(),
      })
    )
    .optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   description: "Do somthing.",
//   img: [],
//   urls:[]
// };

export default function PostAdd() {
  // console.log('user name is ',userName)
  const router =useRouter()
  const session = useSession();
  console.log(session)
  if(session.status==='unauthenticated'&& !session.data){
    router.replace('/sign-in')
  }
  
  const useremail = session?.data?.user.email;
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [message, setMessage] = React.useState("");
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      setSelectedImage([...selectedImage, file]);
      // setSelectedImage(e.target.files[0]);
    }
  };
  // console.log(selectedImage);
  const defaultValues: Partial<ProfileFormValues> = {
    description: "",
    img: [],
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { fields, append } = useFieldArray({
    name: "img",
    control: form.control,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(selectedImage);
    // image upload
    // console.log(data);
    if (selectedImage.length > 0 && session.status==='authenticated') {
      const formData = new FormData();
      Array.from(selectedImage).forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });

      try {
        let response = UploadImage(formData);
        const urlsAndPublicIds = (await response).map((image) => ({
          url: image?.url,
          public_id: image?.public_id,
        }));
        if (urlsAndPublicIds) {
          const response = await axios
            .post("/api/add-post", { data, urlsAndPublicIds, useremail })
            .then(async (response) => {
              // console.log("response after save", response);
              let message = response.data.message;
              setMessage(message);
            });
          toast({
            title: "Post Added",
            description:message,
            variant: "destructive",
          });
        }
      } catch (error: any) {
        console.log("error during adding post", error);
        const axiosError = error as AxiosError<ApiResponse>;
        setMessage(
          axiosError.response?.data.message ??
            "Error checking Email Please try again"
        );
        toast({
          title: "Post Added",
          description: message,
          variant: "destructive",
        });
      }
    } else {
      const response = await axios
        .post("/api/add-post", { data, useremail })
        .then(async (response) => {
          // console.log("response after save", response);
          let message = response.data.message;
              setMessage(message);
        });
      toast({
        title: `post added success`,
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription className="mx-[40%]"></CardDescription>
          <p className="items-center m-auto">Uplode image</p>
          <div className="mx-auto max-w-sm justify-center">
            {fields.map((field, index) => (
              <div key={field.id}>
                <Input accept="image/*" onChange={imageChange} type="file" />
                {/* <Button onClick={() => append({ value: selectedImage })}>save</Button> */}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 items-center"
              onClick={() => append({ value: "" })}
            >
              <PlusCircle />
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 items-center"
              onClick={() => setSelectedImage([])}
            >
              <PlusCircle />
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name "
                        defaultValue="title..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="about your post " {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
