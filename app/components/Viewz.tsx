import React from "react";
import {client} from "@/sanity/lib/client";
import { Startup_by_query } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/write_client";
import { after } from 'next/server'

const Viewz = async ({id}: {id:string}) => {
  const {views: totalViews}=await client.withConfig( {useCdn: false}).fetch(Startup_by_query, {id});
  after(async () => await writeclient
  .patch(id)
  .set({views:totalViews + 1})
  .commit())


  return (
    <div className="view-container bg-primary-100  rounded-sm p-4 w-fit shadow-md">
      <p className="text-black font-bold text-lg">
        Views: <span className=" font-extrabold">{totalViews}</span>
      </p>
    </div>
  );
}

export default Viewz;

