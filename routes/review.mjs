import express from 'express';
export const router = express.Router({mergeParams : true});

import { wrapAsync } from "../utils/wrapAsync.js";

import { isAuthor, isLoggedIn, validateReview } from '../middelware.js';

import reviewController from "../controllers/reviews.mjs";

// Create Review route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

export default router;