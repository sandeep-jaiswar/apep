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
          return res.status(200).send({ success: true, data });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "user does not exists." });
        } finally {
          break;
        }

      case "PATCH":
        try {
          const existingdata = await db
            .collection("users")
            .findOne({ _id: new ObjectId(slug?.toString()) });
          if (!existingdata) {
            return res
              .status(400)
              .json({ success: false, error: "user does not exists" });
          }
          const updatedData = { ...existingdata, ...req.body };
          const data = await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(slug?.toString()) },
              { $set: updatedData }
            );
          return res.status(201).send({ success: true, data });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "Error while creating users" });
        } finally {
          break;
        }

      default:
        return res
          .status(405)
          .send({ success: false, message: "Method is not supported" });
        break;
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export default handler;
