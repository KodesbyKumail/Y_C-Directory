import React from "react";
import StartupForm from "@/app/components/StartupForm";
import {auth} from "@/auth";

import { redirect } from "next/navigation";
const page = async () => {
    const session=await auth();
    if(!session) 
    {
        redirect("/");
    }
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading m-2, p-2">SUMBIT YOUR STARTUP PITCH</h1>
      </section>



      <StartupForm /> 
    </>
  );
};

export default page;
