import Link from "next/link";
import React from "react";
import Image from "next/image";

import {
  auth,
  signOut,
  signIn,
} from "@/auth"; /*So the authorization that we had install and set up using Github has these funtions whichc an be imported and then used on button. Onclick are functions which upon defining the function, that function is executed.*/
import { redirect } from "next/navigation";
const Navbar = async () => {
  const session = await auth();
  return (
    /* Navigation bar component */
    <header className=" px-5 py-3 bg-white w-full shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={150} height={44}></Image>
        </Link>

        <div className="flex gap-5 items-center text-black font-semibold">
          {session ? (
            <>
              <Link href="/startup/create" className="text-primary hover: text-pink-700">
                Create
              </Link>

              <Link href="/startup/Aboutus" className="text-yellow-500">
                About Us

              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="text-black">
                  Log Out
                </button>
              </form>

              <Link href={`/user/${session.id || session.user?.id || ''}`}>
                <span>{session.user?.name || session.username || 'User'}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn('github', { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="bg-primary text-secondary px-4 py-2 rounded-md hover:bg-pink-700"
              >
                Log In
              </button>
            </form>
          )}
          {/* If session exists, show user name and logout button, otherwise show login button */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
