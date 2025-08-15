import { defineQuery } from "next-sanity";


/* This file defines the queries for fetching data from Sanity CMS.
It includes queries for fetching all authors and startups, as well as a query for fetching a specific startup by its slug.*/

export const STARTUPS = defineQuery(`*[_type=="startup" && defined(slug.current) && (!defined($search) || category match $search || title match $search || author->name match $search)] | order(_createdAt desc) {
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
  views
}`);

export const STARTUPS_BY_ID=
defineQuery(`*[_type=="startup" && _id==$id][0] {
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
}`);

export const Startup_by_query=
defineQuery(`*[_type=="startup" && _id==$id][0] {
  _id, views
}`);

export const AUTHOR_GITHUB = 
defineQuery(`*[_type=="author" && id==$id][0] {
  _id, 
  id,
  name,
  username,
  bio,
  email,
  image

}`);

export const AUTHOR_BY_ID= 
defineQuery(`*[_type=="author" && id==$id][0] {
  _id, 
  id,
  name,
  username,
  bio,
  email,
  image

}`);

export const STARTUPS_BY_Author=
defineQuery(`*[_type=="startup" && author._ref==$id][0] {
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
}`);

export const Editorpicks = defineQuery(`
  *[_type == "Playlist" && slug.current == $slug][0]{
    _id, 
    title,
    slug,
    Select[]->{
      _id,
      _createdAt,
      author->{
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
    }
  }
`);






