import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_GITHUB } from "./sanity/lib/queries";
import { writeclient } from "./sanity/lib/write_client";
import { LogIn } from "lucide-react";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: 'Ov23liId3hMKOiZsfDF2',
      clientSecret: 'e60bdaea7ac6b360f6ca809eb591e66b96ee37a6',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback - profile:", profile);
        console.log("SignIn callback - user:", user);
        
        const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_GITHUB, {
          id: profile?.id,
        });
        console.log("Existing user found:", existingUser);
        
        if (!existingUser) {
          console.log("Creating new user with ID:", profile?.id);
          await writeclient.create({
            _type: "author",
            id: profile?.id,
            name: user?.name,
            username: profile?.login,
            email: user?.email,
            image: user?.image,
            bio: profile?.bio || "",
          });
          console.log("New user created successfully");
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return true; // Allow sign in even if database operations fail
      }
    },
    async jwt({token, account, profile }) {
      try {
        console.log("JWT callback triggered - account:", !!account, "profile:", !!profile);
        
        if (account && profile) {
          console.log("JWT callback - profile ID:", profile?.id);
          const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_GITHUB, { id: profile?.id });
          console.log("JWT callback - user found:", user);
          token.id = user?._id;
          token.githubId = profile?.id;
          token.username = profile?.login;
        } else if (token.githubId) {
          // If we already have the data, just return the token
          console.log("JWT callback - using existing token data");
        } else {
          // Try to get user data from existing token
          console.log("JWT callback - no account/profile, trying to get user data");
          if (token.sub) {
            // This is a fallback - we might need to handle this differently
            console.log("JWT callback - token.sub exists:", token.sub);
          }
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    async session({session, token}) {
      console.log("Session callback - token:", token);
      
      let sessionData = {
        id: token.id,
        githubId: token.githubId,
        username: token.username
      };
      
      // If we don't have the user data in token, try to fetch it
      if (!token.id && token.sub) {
        console.log("Session callback - no user data in token, fetching from database");
        try {
          // Try to find user by email (since we have that in token)
          const user = await client.withConfig({useCdn: false}).fetch(`*[_type=="author" && email==$email][0] {
            _id, 
            id,
            name,
            username,
            bio,
            email,
            image
          }`, { email: token.email });
          
          if (user) {
            console.log("Session callback - found user by email:", user);
            sessionData = {
              id: user._id,
              githubId: user.id,
              username: user.username
            };
          }
        } catch (error) {
          console.error("Session callback - error fetching user:", error);
        }
      }
      
      console.log("Session callback - final session data:", sessionData);
      Object.assign(session, sessionData);
      return session;
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: "jwt",
  },
});
