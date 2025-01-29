import { Listing } from "../models/listing.js";

import { ExpressError } from "../utils/ExpressError.js";

const index = async (req, res) => {
        const allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
};

const renderNewForm = (req, res) => {
        res.render("./listings/new.ejs")
};

const createNewListing = async (req, res) => {
        // for first time difining
        // const listing =req.body.listing;
        // let newListing = new Listing({
        //         title : listing.title,
        //         image : {
        //                 filename: listing.filename,
        //                 url: listing.url
        //         },
        //         description : listing.description,
        //         price : listing.price,
        //         location : listing.location,
        //         country : listing.country
        // });
        let url=req.file.path;
        let filename=req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        req.flash("success", "New Listing Added!");
        return res.redirect("/listings");
};

const renderEditForm = async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
                req.flash("error", "Listing does not exist!");
                res.redirect("/listings");
        }
        let originalImage = listing.image.url;
        originalImage = originalImage.replace("upload", "upload/w_200,c_thumb,g_face,r_max");
        res.render("./listings/edit.ejs", { listing, originalImage });
};

const updateListing = async (req, res) => {
        if (typeof req.body.listing !== "undefined" && Object.keys(req.body.listing).length === 0) {
                console.error("No data recieved for listing!");
                throw new ExpressError(400, "Send valid data for listing!");
        }
        const { id } = req.params;
        const updateListing = req.body.listing;
        // const listing = await Listing.findByIdAndUpdate(id, updateListing);
        // if (!currentUser && listing.owner.equals(currentUser._id)) {
        //         req.flash("error", "You do not have permission to do that!");
        //         res.redirect("/listings/" + id);
        // }
        // req.flash("success", "Listing Updated!");
        // res.redirect("/listings/" + id);
        try {
                const listing = await Listing.findByIdAndUpdate(id, updateListing);
                if (!listing) {
                    console.error("Listing not found");
                    throw new ExpressError(404, "Listing not found");
                }
                if (!req.user || !listing.owner.equals(req.user._id)) {
                    console.error("User does not have permission to update this listing");
                    req.flash("error", "You do not have permission to do that!");
                    return res.redirect("/listings/" + id);
                }
                if (typeof req.file !== "undefined") {
                        listing.image.url = req.file.path;
                        listing.image.filename = req.file.filename;
                        await listing.save();
                }
                req.flash("success", "Listing Updated!");
                res.redirect("/listings/" + id);
        } catch (err) {
                console.error("Error updating listing:", err);
                throw err;
        }
};

const showListing = async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
        if (!listing) {
                req.flash("error", "Listing does not exist!");
                res.redirect("/listings");
        }
        res.render("./listings/show.ejs", { listing });
};

const deleteListing = async (req, res) => {
        const { id } = req.params;
        await Listing.deleteOne({ _id: id });
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
};

export default { index, renderNewForm, createNewListing, renderEditForm, updateListing, showListing, deleteListing };