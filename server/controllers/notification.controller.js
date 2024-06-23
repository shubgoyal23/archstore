import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";

const currentNotification = asyncHandler(async (req, res) => {
   const id = req.user?.id;

   const notification = await Notification.find({ userId: id, isRead: false });

   return res
      .status(200)
      .json(
         new ApiResponse(200, notification, "Notification fetched successfull")
      );
});
const markNotificationRead = asyncHandler(async (req, res) => {
   const { notificationId } = req.body;

   const notification = await Notification.findByIdAndDelete(notificationId);

   return res
      .status(200)
      .json(
         new ApiResponse(200, {}, "Notification Marked as read successfull")
      );
});

export { currentNotification, markNotificationRead };
