import assetSchema from '@/schema/asset.schema';
import { Document, model } from 'mongoose';

interface Asset extends Document {
  
}

export default model<Asset>('Asset', assetSchema);
