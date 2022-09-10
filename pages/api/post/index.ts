// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";
import { allPostsQuery } from "../../../utils/queries";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await sanityClient.fetch(query);
    res.status(200).json(data);
  }
}
