// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await sanityClient.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = req.body;
    sanityClient
      .create(document)
      .then(() => res.status(201).json("Video Created!"));
  }
}
