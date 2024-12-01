import { Schema, model } from "mongoose";

export interface ITags {
  name: String;
  description?: String;
}

const tagSchema = new Schema<ITags>({
  name: { type: String, required: true },
  description: { type: String },
});

export const Tags = model<ITags>("Tags", tagSchema);
