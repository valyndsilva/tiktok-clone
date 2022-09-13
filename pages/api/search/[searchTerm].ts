import type { NextApiRequest, NextApiResponse } from "next";

import { searchPostsQuery } from "../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    const videosQuery = searchPostsQuery(searchTerm);

    const videos = await sanityClient.fetch(videosQuery);

    res.status(200).json(videos);
  }
}
