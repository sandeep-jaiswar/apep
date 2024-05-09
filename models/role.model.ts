import roleSchema from "@/schema/role.schema";
import { Document, model } from "mongoose";

interface Role extends Document {}

export default model<Role>("Role", roleSchema);
