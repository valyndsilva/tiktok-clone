// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "POST") {
    const user = req.body;

    // Creates a new user inside sanity db
    sanityClient
      .createIfNotExists(user)
      .then(() => res.status(200).json("Login Success"));
  }
}
