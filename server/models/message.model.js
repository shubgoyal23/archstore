import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
   {
      from: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         index: true,
      },
      to: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         index: true,
      },
      message: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
