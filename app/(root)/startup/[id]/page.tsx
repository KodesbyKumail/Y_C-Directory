import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID } from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import { formatDate } from "@/lib/utils";
export const experimental_ppr = true;
import Link from "next/link";
import { Author } from "@/sanity.types";
import markdownit from 'markdown-it';
import Viewz from "@/app/components/Viewz";
import { Editorpicks } from "@/sanity/lib/queries";
import StartupCard from "@/app/components/StartupCard";
import { StartupCardType } from "@/app/components/StartupCard";

const md=markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  

  const post = await client.fetch(STARTUPS_BY_ID, { id });

  const response = await client.fetch(Editorpicks, {slug: 'picks-of-the-day'});
  const {Select: editorpicks} = response || { Select: [] };

  if (!post) {
    return <h1 className="pink_container">Startup not found</h1>;
  }
  const parsedContent=md.render(post?.pitch || '')
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="Startup_image"
          className="w-full h-auto rounded-x"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto justify-between"> 
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex flex-col items-center mb-3"
            >
              <p className="text-20-medium">{post.author?.name}</p>
              <div>
                <p className="flex gap-2 text-16-medium !text-black-300">
                @{post.author?.username}
              </p>
              </div>
              
            </Link>

            <div className="flex flex-col">
             <p className="category-tag">{post.category}</p>
             <p><Viewz id={id}/></p>
            </div>


          </div>
          <div className="flex place-items-end">


          </div>
        <h3 className="font-sans text-[38px] font-bold ">Pitch Details</h3>
         {parsedContent ? (
            <article className="prose, max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{__html:parsedContent}}/>

         ) :
            (
                <p className="no reuslt">No detail provided</p>
            )
         }

        </div>

        <hr className="divider"></hr>

        {editorpicks?.length>0 && (
          <div className="max-w-4xl mx-auto ">
            <p className="text-30-semibold">Editor Pics</p>

            <ul className="mt-7 card_grid-sm">

              {editorpicks.map((post: StartupCardType, i : number) => (<StartupCard key={i} post={post}/>
            ))};

            </ul>




          </div>
        )}
        
        
        

      </section>
      
    </>
  );
};

export default page;
