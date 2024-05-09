import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  role_id: {
    type: String,
    required: true,
    description: "Unique identifier for the role",
  },
  name: {
    type: String,
    required: true,
    description: "Name of the role",
  },
  permissions: {
    type: [String],
    description: "Array of permissions associated with the role",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Timestamp of role creation",
  },
});

export default roleSchema;
