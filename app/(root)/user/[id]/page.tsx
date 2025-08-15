import { auth } from "@/auth";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";
import React from "react";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/app/components/UserStartups";


export const experimental_ppr=true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  console.log("URL ID:", id);
  console.log("Session ID:", session?.id);
  console.log("Session GitHub ID:", session?.githubId);

  // Try to fetch user by Sanity _id first (if it's a Sanity document ID)
  let user = await client.fetch(`*[_type=="author" && _id==$id][0] {
    _id, 
    id,
    name,
    username,
    bio,
    email,
    image
  }`, { id });

  // If not found, try by GitHub ID (convert string to number)
  if (!user) {
    const githubId = parseInt(id);
    if (!isNaN(githubId)) {
      user = await client.fetch(AUTHOR_BY_ID, { id: githubId });
    }
  }

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-38-extrabold mt-7 text-center">@{user.username}</p>

          <p className="mt-1 text-center text-14-normal">{user.bio} </p>
        </div>

        <ul className="card_grid-sm">
            
            <UserStartups id={id}/>


        </ul>
      </section>
    </>
  );
};

export default page;
