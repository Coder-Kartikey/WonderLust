import { Listing } from "./models/listing.js";
import { Review } from "./models/review.js";
import { ExpressError } from "./utils/ExpressError.js";
import { listingSchema, reviewSchema } from "./schema.cjs";

// Checking if the user is logged in
export const isLoggedIn = (req,res,next) => {
        if(!req.isAuthenticated()){
                req.session.returnTo = req.originalUrl;
                req.flash("error", "You must be signed in!");
                return res.redirect("/login");
        }
        next();
};

// Saving the returnTo path
export const saveReturnTo = (req,res,next) => {
        if(req.session.returnTo){
                res.locals.returnTo = req.session.returnTo;
        }
        next();
};

// Checking if the user is the owner of the listing
export const isOwner = async (req,res,next) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currentUser._id)){
                req.flash("error", "You do not have permission to do that!");
                return res.redirect(`/listings/${id}`);
        }
        next();
};

// Validating the listing
export const validateListing = (req, res, next) => {
        let { error } = listingSchema.validate(req.body);
        if (error){
                const errMsg = error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

// Validating the review
export const validateReview = (req, res, next) => {
        let { error } = reviewSchema.validate(req.body);
        if (error){
                const errMsg = error.details.map((el) => el.message).join(",");
                throw new ExpressError(400, errMsg);
        } else{
                next();
        }
};

// Checking if the user is the author of the review
export const isAuthor = async (req,res,next) => {
        const { id, reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currentUser._id)){
                req.flash("error", "You do not have permission to do that!");
                return res.redirect(`/listings/${id}`);
        }
        next();
};

// export default isLoggedIn;
export default { isLoggedIn, saveReturnTo, isOwner, validateListing, validateReview, isAuthor };