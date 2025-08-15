import Image from "next/image";
import Link from "next/link";
import AddtoCart from "../components/productCard";
import React from "react";
import SearchForm from "../components/SearchForm";
import StartupCard, {StartupCardType} from "../components/StartupCard";
import {client} from "@/sanity/lib/client";
import {STARTUPS} from "@/sanity/lib/queries";
import { auth } from "@/auth";
{/*The searchParams are used to get the query from the URL, which is then used to filter the startups based on the search term.*/}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const PARAMS= {search: query || null};
  // Fetching all startups from Sanity CMS using the STARTUPS query defined in queries.ts
  // The client is used to fetch the data from Sanity CMS.
  // The STARTUPS query fetches all startups with their details like title, author, description
  const posts=await client.fetch(STARTUPS, PARAMS)
  const session = await auth();
  console.log(session?.id)

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          PITCH YOUR STARTUP, CONNECT WITH ENTREPRENEURS
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>
      {/* Main section for displaying search results or all startups and their details. The startups would be displayed in the form of a card */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
           {/*in this ternary operator either, results relating to the query will be displayed or all startups will be displayed*/}
          {/*Another ternary operator to check if posts are available or not, if not then no results will be displayed*/}
          <ul className="mt-7 card_grid text-15-regular">
            { posts.length > 0 ? (
              posts.map((post: StartupCardType) => (  
              <StartupCard key={post?._id } post={post}/>
            ))
              ): (
                <p className="no-results"> No Startups</p>
              )
            }

          </ul>

    


      </section>
    </>
  );
}
