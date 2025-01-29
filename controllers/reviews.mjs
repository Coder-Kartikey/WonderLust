import { Listing } from "../models/listing.js";

import { Review } from "../models/review.js";

const createReview = async (req, res) => {
                const { id } = req.params;
                const newReview = new Review(req.body.review);
                let listing = await Listing.findById(id);
                newReview.author = req.user._id;
                let out = listing.reviews.push(newReview);
                await newReview.save();
                await listing.save();
                req.flash("success", "New Review Added!");
                res.redirect("/listings/"+id);
        };

const deleteReview = async (req,res) => {
        const { id , reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull : {reviews : reviewId } } );
        await Review.deleteOne({ _id : reviewId });
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
}

export default { createReview, deleteReview };