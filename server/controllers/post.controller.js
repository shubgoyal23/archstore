import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";

const addPost = asyncHandler(async (req, res) => {
   const { content, isPublic } = req.body;
   const id = req.user?._id;

   let mediaLocalPath;
   if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
   ) {
      mediaLocalPath = req.files.avatar[0].path;
   }

   if (!content && !mediaLocalPath) {
      throw new ApiError(400, "Content or Media is required to Create Post");
   }
   let media;
   if (mediaLocalPath) {
      media = await uploadOnCloudinary(mediaLocalPath);

      if (!media) {
         throw new ApiError(400, "Avatar file is required");
      }
   }

   const createPost = await Post.create({
      userId: id,
      content,
      media,
      isPublic,
   });

   if (!createPost) {
      throw new ApiError(400, "failed to Create Post, Try again later");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, createPost, "post created successfully"));
});
const likePost = asyncHandler(async (req, res) => {
   const { postId } = req.body;
   const userId = req.user?._id;

   const findPost = await Post.findById(postId);

   if (!findPost) {
      throw new ApiError(404, "post not found!");
   }
   const findLiked = await Like.findOne({ userId, postId });

   if (findLiked) {
      await Like.findByIdAndDelete(findLiked._id);
      return res
         .status(200)
         .json(new ApiResponse(200, {}, "post unLiked successfully"));
   }

   const createlike = await Link.create({
      userId,
      postId,
   });

   if (!createlike) {
      throw new ApiError(400, "failed to Create Like, Try again later");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, {}, "Liked successfully"));
});

const commentOnPost = asyncHandler(async (req, res) => {
   const { postId, comment } = req.body;
   const userId = req.user?._id;

   const findPost = await Post.findById(postId);

   if (!findPost) {
      throw new ApiError(404, "post not found!");
   }

   const createComment = await Comment.create({
      userId,
      postId,
      comment,
   });

   if (!createComment) {
      throw new ApiError(400, "failed to Create Comment, Try again later");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment added successfully"));
});

export {addPost, likePost, commentOnPost}