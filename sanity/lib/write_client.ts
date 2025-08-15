import "server-only"
import { apiVersion, dataset, projectId, token} from '../env'
import { createClient } from "next-sanity"

export const writeclient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

if(!writeclient.config().token)
{
    throw new Error("Write token not found")
}