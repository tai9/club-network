import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import axiosClient, { axiosServer } from "@/configs/axiosConfig";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axiosServer.post("/login", credentials);
          const user = res.data;
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (err) {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user) return false;
      try {
        if (account?.provider === "google") {
          const member = await axiosClient.post("/login/email", {
            name: user.name,
            email: user.email,
            image: user.image,
          });
          return !!member.data;
        }
      } catch (err) {
        return false;
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.idToken = user.id;
        token.accessToken = user.accessToken;
      }
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.idToken = token.idToken;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export default NextAuth(authOptions);
