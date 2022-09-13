import type { NextApiRequest, NextApiResponse } from "next";

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "./../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // /api/profile/:id call request
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    const user = await sanityClient.fetch(query);
    const userVideos = await sanityClient.fetch(userVideosQuery);
    const userLikedVideos = await sanityClient.fetch(userLikedVideosQuery);

    const data = { user: user[0], userVideos, userLikedVideos };

    res.status(200).json(data);
  }
}
