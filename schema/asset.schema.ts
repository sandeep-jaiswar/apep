import { Schema } from "mongoose";

const assetSchema = new Schema({
  asset_id: {
    type: String,
    required: true,
    description: "Unique identifier for the asset",
  },
  url: {
    type: String,
    required: true,
    description: "URL of the asset",
  },
  metadata: {
    type: Schema.Types.Mixed,
    description: "Metadata associated with the asset",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Timestamp of asset creation",
  },
});

export default assetSchema;
