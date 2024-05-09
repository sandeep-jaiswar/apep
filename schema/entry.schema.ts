import { Schema, model } from "mongoose";

const entrySchema = new Schema({
  entry_id: {
    type: String,
    required: true,
    description: "Unique identifier for the entry",
  },
  content_type_id: {
    type: String,
    required: true,
    description: "Identifier for the associated content type",
  },
  fields: {
    type: Schema.Types.Mixed,
    required: true,
    description: "Object containing the content data",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Timestamp of entry creation",
  },
});

export default entrySchema;
