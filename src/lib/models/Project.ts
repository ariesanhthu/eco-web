import mongoose,{ Schema, model,Model, Document } from "mongoose";

import { IProject } from "@/utils/interface";
// Schema cho Project
const ProjectSchema = new Schema<IProject>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
mongoose.models.Project || model<IProject>('Project', ProjectSchema);
