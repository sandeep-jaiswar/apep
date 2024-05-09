import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const { slug } = req.query;

    switch (req.method) {
      case "GET":
        try {
          const data = await db
            .collection("users")
            .findOne({ _id: new ObjectId(slug?.toString()) });
          if (!data) {
            return res
              .status(404)
              .send({ success: false, error: "User not found" });
          }
          return res.status(200).send({ success: true, data });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "Error while fetching user data" });
        }

      case "PATCH":
        try {
          const existingData = await db
            .collection("users")
            .findOne({ _id: new ObjectId(slug?.toString()) });
          if (!existingData) {
            return res
              .status(404)
              .json({ success: false, error: "User not found" });
          }
          const updatedData = { ...existingData, ...req.body };
          const result = await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(slug?.toString()) },
              { $set: updatedData }
            );
          if (result.modifiedCount === 0) {
            return res.status(400).json({ success: false, error: "No changes detected" });
          }
          return res.status(200).send({ success: true, data: updatedData });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "Error while updating user" });
        }

      default:
        return res
          .status(405)
          .send({ success: false, message: "Method is not supported" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
