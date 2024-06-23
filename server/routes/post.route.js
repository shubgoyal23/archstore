import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { addPost, commentOnPost, likePost } from "../controllers/post.controller.js";

const router = Router();


// secure route only
router.route("/add").post(
   verifyJWT,
   upload.fields([
      {
         name: "avatar",
         maxCount: 1,
      },
   ]),
   addPost
);
router.route("/like").post(verifyJWT, likePost)
router.route("/comment").post(verifyJWT, commentOnPost)

export default router;
