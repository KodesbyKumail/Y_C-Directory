import { STARTUPS_BY_Author } from '@/sanity/lib/queries'
import React from 'react'
import { client } from '@/sanity/lib/client'
import StartupCard, { StartupCardType } from './StartupCard'

const UserStartups = async({id}:{id:string}) => {
    console.log("UserStartups - ID:", id);
    
    // Try to fetch startups by author reference
    let startups = await client.fetch(`*[_type=="startup" && author._ref==$id] {
      _id,
      title,
      _createdAt,
      slug,
      "author": author -> {
        _id,
        name,
        username,
        image,
        bio
      },
      description,
      category,
      image,
      pitch,
      views
    }`, {id});
    
    // If no results, try by GitHub ID
    if (!startups || startups.length === 0) {
      const githubId = parseInt(id);
      if (!isNaN(githubId)) {
        // First get the author by GitHub ID
        const author = await client.fetch(`*[_type=="author" && id==$githubId][0]`, { githubId });
        if (author) {
          startups = await client.fetch(`*[_type=="startup" && author._ref==$authorId] {
            _id,
            title,
            _createdAt,
            slug,
            "author": author -> {
              _id,
              name,
              username,
              image,
              bio
            },
            description,
            category,
            image,
            pitch,
            views
          }`, { authorId: author._id });
        }
      }
    }
    
    console.log("Found startups:", startups);
    
    return (
        <>
            {startups && startups.length > 0 ? (
                startups.map((startup: StartupCardType) => (
                    <StartupCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className='no-result'>No Posts Yet</p>
            )}
        </>
    )
}

export default UserStartups
