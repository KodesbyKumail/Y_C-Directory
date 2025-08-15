import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author';
import { startup } from './startup';
import { Playlist } from './editorpicks';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, Playlist],
};
