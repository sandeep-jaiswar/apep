import contentTypeSchema from '@/schema/contentType.schema';
import { Document, model } from 'mongoose';

interface ContentType extends Document {
  
}

export default model<ContentType>('ContentType', contentTypeSchema);
