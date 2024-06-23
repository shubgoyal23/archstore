import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Follow } from "../models/follower.model.js";

const follow = asyncHandler(async (req, res) => {
   const { followed } = req.body;
   const follower = req.User?._id;
   if (!followed) {
      throw new ApiError(400, "followed Id is required");
   }

   const checkUser = await User.findById(followed);

   if (!checkUser) {
      throw new ApiError(404, "user with Id not found.");
   }

   const createFollowing = await Follow.create({
      followed,
      follower,
   });

   if (!createFollowing) {
      throw new ApiError(400, "Failed to follow user, Try again Later");
   }
   return res
      .status(200)
      .json(new ApiResponse(200, {}, "user Followed Successfully"));
});

const followerList = asyncHandler(async (req, res) => {
   const id = req.User?._id;

   const list = await Follow.aggregate([
      { $match: { followed: id } },
      {
         $lookup: {
            from: "users",
            localField: "follower",
            foreignField: "userId",
            as: "userDetails",
         },
      },
      {
         $unwind: "$userDetails",
      },
      {
         $project: {
            _id: 0,
            userId: "$userDetails._id",
            username: "$userDetails.username",
         },
      },
   ]);

   if (!list) {
      throw new ApiError(400, "Failed to fetch followers");
   }
   return res
      .status(200)
      .json(new ApiResponse(200, list, "Followers list fetched successfully"));
});
const followedList = asyncHandler(async (req, res) => {
   const id = req.User?._id;

   const list = await Follow.aggregate([
      { $match: { follower: id } },
      {
         $lookup: {
            from: "users",
            localField: "followed",
            foreignField: "userId",
            as: "userDetails",
         },
      },
      {
         $unwind: "$userDetails",
      },
      {
         $project: {
            _id: 0,
            userId: "$userDetails._id",
            username: "$userDetails.username",
         },
      },
   ]);

   if (!list) {
      throw new ApiError(400, "Failed to fetch followed list");
   }
   return res
      .status(200)
      .json(new ApiResponse(200, list, "Followed list fetched successfull"));
});

export { follow, followedList, followerList };
