"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Google } from "@/components/Icons";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



export default function SignUp() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debouncedemial = useDebounceCallback(setEmail, 1500);
  const debounced = useDebounceCallback(setUsername, 1500);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // redirect
  const session = useSession();
  if (session.status === "authenticated") {
    router.replace("/");
  }

  // Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  // user name check
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username.length > 1) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          let message = response.data.message;

            
          // console.log(response.data.message)
          
          setUsernameMessage(message);
   
          
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
  // email check
  useEffect(() => {
    const checkemailUnique = async () => {
      if (email) {
        setIsCheckingEmail(true);
        setEmailMessage("");

        try {
          const response = await axios.get(
            `/api/check-email-register?email=${email}`
          );
          let message = response.data.message;
          
            
          // console.log(response.data.message)
          
          setEmailMessage(message);
      
          
        } catch (error: any) {
          const axiosError = error as AxiosError<ApiResponse>;
          setEmailMessage(
            axiosError.response?.data.message ??
              "Error checking Email Please try again"
          );
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
    
    checkemailUnique();
  }, [email]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmiting(true);
    try {
      if (usernameMessage === "Username is avlable" && emailMessage==="This is Unique Email") {
        const response = await axios.post<ApiResponse>("/api/sign-up", data);
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace(`/verify/${username}`);
      } else {
        toast({
          title: "Signup failed",
          description: "Username or email is already taken change the user name or email",
          variant: "destructive",
        });
        setIsSubmiting(false);
      }
    } catch (error: any) {
      console.error("Error in SIgnUp of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmiting(false);
    }
  };
  // show or hide password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className=" flex items-center min-h-[100vh]">
      <Card className="mx-auto max-w-sm w-full my-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => signIn("google")}
            className="w-full text-center flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-700 rounded-lg shadow-md px-5 py-2.5 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Google />
            <span>Continue with Google</span>
          </Button>
          <div className="flex w-full items-center gap-2 py-6 text-sm ">
            <div className="h-px w-full bg-slate-200"></div>
            OR
            <div className="h-px w-full bg-slate-200"></div>
          </div>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is avlable"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>

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
                      <Input
                        placeholder="email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedemial(e.target.value)
                        }}
                      />
                    </FormControl>
                    {isCheckingEmail && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <p
                      className={`text-sm ${
                        emailMessage === "This is Unique Email"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {emailMessage}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Password</FormLabel>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormControl>
                    <div className="relative">
                      <div
                        className="p-1 rounded-none absolute right-5 top-1 h-4 w-4 text-muted-foreground dark:text-white text-black"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon color="var(--fill-color)" icon={faEye} />
                        ) : (
                          <FontAwesomeIcon color="var(--fill-color)" icon={faEyeSlash} />
                        )}
                      </div>
                      <Input
                        className=""
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </div>
                  </FormControl>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white bg-black dark:bg-gray-500 hover:bg-primary-700 dark:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isSubmiting}
              >
                {isSubmiting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait ....
                  </>
                ) : (
                  "Crate an Account"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="sign-in" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
