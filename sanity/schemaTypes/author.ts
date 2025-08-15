import {defineType} from 'sanity';

import {UserIcon} from "lucide-react"
import {defineField} from 'sanity';
{/* This file defines the schema for the author type in Sanity CMS.
It includes fields for the author's ID, name, username, image, and bio.*/}

export const author = defineType({
  name: 'author',
  title:'Author',
  type: 'document',
  icon:UserIcon,
  fields: [
    defineField({
        name: 'id',
        type: 'number',
    }),
    defineField({
        name: 'name',
        type: 'string',
    }),
    defineField({
        name: 'email',
        type: 'email',
    }),
    defineField({
        name: 'username',
        type: 'string',
    }),
    defineField({
        name: 'image',
        type: 'url',
    }),
    defineField({
        name: 'bio',
        type: 'text'
    })
  ],
    preview: {
        select: {
        title: 'name',
        },
    },

}) ;
