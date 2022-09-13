// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../lib/sanity";
import { allUsersQuery } from "./../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const data = await sanityClient.fetch(allUsersQuery());

    if (data) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}
