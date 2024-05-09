import { Schema, model } from "mongoose";

const contentTypeSchema = new Schema({
  content_type_id: {
    type: String,
    required: true,
    description: "Unique identifier for the content type",
  },
  name: {
    type: String,
    required: true,
    description: "Name of the content type",
  },
  fields: {
    type: [String],
    required: true,
    description: "Array of fields defining the content structure",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Timestamp of content type creation",
  },
});

export default contentTypeSchema;
