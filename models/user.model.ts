import userSchema from '@/schema/user.schema';
import { Document, model } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  role: string;
  created_at?: Date;
}

export default model<User>('User', userSchema);
