import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         index: true,
      },
      content: {
         type: String,
      },
      media: {
         type: String,
      },
      isPublic: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
