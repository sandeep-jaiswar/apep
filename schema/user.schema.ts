import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    description: "Email address for communication and authentication",
  },
  password: {
    type: String,
    required: true,
    description: "Hashed password for authentication",
  },
  role: {
    type: String,
    required: true,
    description: "Role of the user for access control",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Timestamp of user creation",
  },
});

export default userSchema;
