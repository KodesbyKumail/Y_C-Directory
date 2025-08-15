import {defineType} from 'sanity';

import {UserIcon} from "lucide-react"
import {defineField} from 'sanity';
{/* This file defines the schema for the author type in Sanity CMS.
It includes fields for the author's ID, name, username, image, and bio.*/}

export const startup = defineType({
  name: 'startup',
  title:'Author',
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
        name: 'author',
        type: 'reference',
        to: [{type: 'author'}],
    }),
    defineField({
        name: 'views',
        type: 'number',
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
        name: 'category',
        type: 'string',
        validation: (Rule) => Rule.required().min(1).max(50).error('Category must be between 1 and 50 characters'), 
    }),
    defineField({
        name: 'image',
        type: 'url',
        validation: (Rule) => Rule.required().uri({scheme:['http', 'https']}).error('Image must be a valid URL'), 
    }),
    defineField({
        name: 'pitch',
        type: 'markdown',
    })
  ],

}) ;
