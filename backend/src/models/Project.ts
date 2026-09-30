import mongoose, { Schema, Types } from "mongoose";

interface Project {
  title: string;
  description: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<Project>(
  {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Project>("Project", projectSchema);
