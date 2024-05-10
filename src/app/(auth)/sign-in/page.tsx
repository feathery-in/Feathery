"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
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
import { signInSchema } from "@/schemas/signInSchema";

import { Google, LogoIcon } from "@/components/Icons";
// login
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



export default function SignIn() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debounced = useDebounceCallback(setEmail, 1000);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // redirect 
  const session = useSession();
  if(session.status==='authenticated'){
    router.replace('/')
  }
  // Zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkemailUnique = async () => {
      if (email) {
        setIsCheckingEmail(true);
        setEmailMessage("");

        try {
          const response = await axios.get(
            `/api/check-email-login?email=${email}`
          );
          // console.log(response.data.message)
          let message = response.data.message;
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

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmiting(true);
    const password = data.password;
    const email = data.email;
    try {
      if (emailMessage === "email is Valid") {
        const response = await signIn("credentials", {
          email: email,
          password: password,
        });
        toast({
          title: "Success",
          description: "Login successfull",
        });
      }
      else{
        toast({
          title:"Email not Register",
          description:"Go to Sign Up First",
          variant: "destructive",
        })
        setIsSubmiting(false);
      }
    } catch (error: any) {
      console.error("Error in SIgnUp of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signin failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmiting(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className=" flex items-center min-h-[100vh]">

    
      <Card className="mx-auto max-w-sm w-full my-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">Login</CardTitle>

          <CardDescription>
            Enter your information to login to your account
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
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingEmail && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <p
                      className={`text-sm ${
                        emailMessage=== "email is Valid"
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
                           <FontAwesomeIcon icon={faEye} />
                          ) : (
                            <FontAwesomeIcon icon={faEyeSlash} />
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
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Create an Account{" "}
            <Link href="sign-up" className="underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
