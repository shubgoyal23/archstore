import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// secure route
router.route("/").get(verifyJWT, follow);
router.route("/").post(verifyJWT, followerList);

export default router;
