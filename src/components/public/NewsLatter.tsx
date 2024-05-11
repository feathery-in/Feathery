"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast, useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Newsletter() {
  const { toast } = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password:'',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log("data is ");
    console.log(data);
    setIsSubmiting(true);

    try {
      if (data.email) {
        const response = await axios.post<ApiResponse>("/api/newsletter", data);
        // console.log("responsee is:-",response.data.message)
        toast({
          title: " Success",
          description: response.data.message,
        });
        setIsSubmiting(false)
      } else {
        setIsSubmiting(false);
        toast({
          title: "failed",
          description: "error",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setIsSubmiting(false);
      console.log(error);
    }
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Daily{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-8 md:gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white bg-black dark:bg-gray-500 hover:bg-primary-700 dark:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                  ....
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
}
