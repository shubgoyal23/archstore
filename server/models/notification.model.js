import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      title: String,
      notification: String,
      isRead: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
