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
        const saveuser=await UserModel.updateOne(
          { email: user.email },
          { $set: { isVerified:true,email: user.email, image:user.image,name:user.name,username:user.username||(user.email)?.split("@")[0].replace(/[^a-zA-Z0-9_]/g, '')} },
          { upsert: true }
        );
        return true;
    },

    
        
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
    async session({ session, token,user }) {
      await dbConnect()
      const email=session.user.email
      const userData = await UserModel.findOne({email})
      if (token) {
        session.user._id = token._id || userData?._id.toString();
        session.user.isVerified = token.isVerified || userData?.isVerified;
        session.user.isAccpetingMessages = token.isAccpetingMessages||userData?.isAcceptingMessage;
        session.user.username = token.username || userData?.username;
        session.user.name = token.name ||userData?.name;
      }
      // console.log(session)
      return session;
    },
  },
};


