import mongoose,{ Schema, model,Model } from "mongoose";

import { IProject } from "@/utils/interface";
// Schema cho Project
const ProjectSchema = new Schema<IProject>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
  }
);

export const Project: Model<IProject> =
mongoose.models.Project || model<IProject>('Project', ProjectSchema);
