import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {
   follow,
   followedList,
   followerList,
} from "../controllers/follow.controllers.js";

const router = Router();

// secure route only
router.route("/add").post(verifyJWT, follow);
router.route("/followers").post(verifyJWT, followerList);
router.route("/followed").post(verifyJWT, followedList);

export default router;
