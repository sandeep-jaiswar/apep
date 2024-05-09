import entrySchema from '@/schema/entry.schema';
import { Document, model } from 'mongoose';

interface Entry extends Document {
  
}

export default model<Entry>('Entry', entrySchema);
