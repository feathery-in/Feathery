"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadImage } from "@/helpers/Upload";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Edit, Loader2 } from "lucide-react";
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

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  fullname: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  bio: z.string().max(160).min(4),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
};

export default function ProfileForm() {
  // console.log('user name is ',userName)
  const session = useSession();
  const useremail = session?.data?.user.email;
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const debounced = useDebounceCallback(setUsername, 1500);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
    console.log(e)
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = async (data: ProfileFormValues) => {
    // image upload
    try {
      if (selectedImage && usernameMessage === "Username is avlable") {
        const formData = new FormData();
        formData.append("image", selectedImage);
        let response = UploadImage(formData);
        const urlsAndPublicIds = (await response).map((image) => ({
          url: image?.url,
          public_id: image?.public_id,
        }));
        if (urlsAndPublicIds) {
          
          const response = await axios
            .post("/api/profile-update", { data, urlsAndPublicIds, useremail })
            .then(async (response) => {
              console.log("response after save", response);
            });
          toast({
            title: "Profile Update",
            description: "Profile Update successfully ",
          });
        }
      } else if (usernameMessage === "Username is avlable") {
        const response = await axios
          .post("/api/profile-update", { data, useremail })
          .then(async (response) => {
            // console.log("response after save", response);
          });
        toast({
          title: "Profile Update",
          description: "Profile Update successfully ",
        });
      }
    } catch (error: any) {
      console.log("error during updating profile", error);
      toast({
        title: "Profile Update",
        description: "Profile Updation failed Please try Again ",
      });
    }
  };

  // check user name

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username && username.length > 1) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          setTimeout(async () => {
            const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          // console.log(response.data.message)
          let message = response.data.message;
          setUsernameMessage(message);
          }, 1000)
          
        } catch (error: any) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking Usernaem"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
          <CardDescription className="mx-[40%]"></CardDescription>
          <div className="mx-auto max-w-sm justify-center">
            <label>
              <div className="items-center justify-center ">
                <Edit className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </div>
              <Input
                onChange={imageChange}
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>

            <Avatar className="max-md:h-20 max-md:w-20 h-24 w-24 rounded-full border-4 object-cover border-white mx-auto md:mx-0 bg-white">
              {selectedImage ? (
                <>
                  <AvatarImage
                    src={URL.createObjectURL(selectedImage)!}
                    alt=" "
                  />
                </>
              ) : (
                <>
                  <AvatarImage src={session.data?.user.image!} />
                  <AvatarFallback>AK</AvatarFallback>
                </>
              )}
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name "
                        defaultValue={session.data?.user?.name! || " "}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span
                      className={`text-sm ${
                        usernameMessage === "Username is avlable"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </span>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="bio " {...field} />
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