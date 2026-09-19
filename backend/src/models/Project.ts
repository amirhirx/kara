import mongoose, { Schema } from "mongoose";

interface Project {
  title: string;
  description: string;
  createdAt: Date;
}

const projectSchema = new Schema<Project>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Project>("Project", projectSchema);
