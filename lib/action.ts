'use server'
import { auth } from "@/auth";
import slufigy from 'slugify';
import { writeclient } from "@/sanity/lib/write_client";


export const createPitch = async (state: any, form:FormData, pitch:string) => {
    const session = await auth();

    if(!session) return JSON.parse(JSON.stringify({error: 'Not signed in', status:'ERROR',}));

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key!='pitch'),

    );
    const slug=slufigy(title as string, {lower:true, strict:true});

    
    try {
        console.log("Session data:", session);

        const startup = {
            title,
            description,
            category,
            image:link,
            slug: 
            {
                _type:slug, 
                current:slug,
            },
            author:
            {
                _type:'reference',
                _ref: session?.id,

            },
            pitch,
        };

        const result= await writeclient.create({_type:"startup", ...startup });
        

        

       return JSON.parse(JSON.stringify({... result, error: '', status: 'SUCCESS'}));


    } catch(error)
    {
        console.log(error);


        return JSON.parse(JSON.stringify({error: JSON.stringify(error), status:'ERROR',}));

    }
     
};