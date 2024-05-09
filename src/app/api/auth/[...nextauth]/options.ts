import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { use } from "react";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const email = credentials?.email;
        const password = credentials?.password;
        // console.log(email,password)
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });
          // console.log('user login',user)
          if (!user) {
            // throw new Error('No user found with this email')
            return user;
          }
          if (!user.isVerified) {
            throw new Error("Please vefify your account berore login");
            // send new verification email
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({user, account, profile}) {
      // console.log('user',user,'account',account,'Profile',profile)
        await dbConnect();
        await UserModel.updateOne(
          { email: user.email },
          
          { $set: { email: user.email, image:user.image,name:user.name,username:(user.email)?.split("@")[0].replace(/[^\w.-]/g, '')} },
          { upsert: true }
        );
        return true;
      },

    // async session({session, user}) {
    //     // Customize the session here
    //     session.user = {
    //       image:user.image,
    //       email: user.email,
    //       name: user.name!,
    //       username:user.email.split("@")[0]
    //       // Add any other user properties you need
    //     };
    //   },
        
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAccpetingMessages;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAccpetingMessages = token.isAccpetingMessages;
        session.user.username = token.username;
        session.user.name = token.name;
      }
      return session;
    },
  },
};


