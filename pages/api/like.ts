import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4"; // lets you attach a uid to every single like request

import { sanityClient } from "../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;

    const data = like
      ? await sanityClient
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await sanityClient
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    res.status(200).json(data);
  }
}
// Like and unline posts using sanity client
