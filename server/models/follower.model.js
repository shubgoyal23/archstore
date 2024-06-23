import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
   {
      followed: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      follower: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      
   },
   { timestamps: true }
);

export const Follow = mongoose.model("Follow", followerSchema);
