import {defineType} from 'sanity';
import {UserIcon} from "lucide-react"
import {defineField} from 'sanity';
{/* This file defines the schema for the author type in Sanity CMS.
It includes fields for the author's ID, name, username, image, and bio.*/}

export const Playlist = defineType({
  name: 'Playlist',
  title:'Playlists',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        options: {
            source: 'title',
        },
    }),
    defineField({
        name: 'Select',
        type: 'array',
        of: [{type: "reference", to: [{type:"startup"}]}],
    }),
    
  ],

}) ;
