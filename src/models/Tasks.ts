import { Schema, model, Types } from "mongoose";

export enum TaskStatus {
  Progess = "InProgress",
  Completed = "Completed",
}

export interface ITasks {
  name: string;
  tags: Types.ObjectId[];
  status: TaskStatus;
  deadline: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new Schema<ITasks>(
  {
    name: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
    status: { type: String, enum: Object.values(TaskStatus), required: true },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Tasks = model<ITasks>("Tasks", taskSchema);
