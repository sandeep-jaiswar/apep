import clientPromise from "@/lib/mongodb";
import userModel from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    switch (req.method) {
      case "GET":
        try {
          const data = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1000)
            .toArray();
          return res.status(200).send({ success: true, data });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "Error while fetching user data" });
        }

      case "POST":
        try {
          const user = new userModel(req.body);
          const existingData = await db.collection("users").findOne({ $where: function () {
            return this.email === user.email;
          } });
          if (existingData) {
            return res
              .status(400)
              .json({ success: false, error: "Email address already exists" });
          }
          await db.collection("users").createIndex({ email: 1 }, { unique: true });
          const result = await db.collection("users").insertOne(user);
          return res.status(201).send({ success: true, data: result });
        } catch (error) {
          return res
            .status(500)
            .send({ success: false, message: "Error while creating user" });
        }

      default:
        return res
          .status(405)
          .send({ success: false, message: "Method not supported" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
