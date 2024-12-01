import express from 'express';
const app = express();

import ejsMate from 'ejs-mate';
app.engine('ejs', ejsMate);

import path from 'path';

import { Listing } from "./models/listing.js";

import mongoose from 'mongoose';

import methodOverride from 'method-override';

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

main().then( () => {
        console.log("Connection Seccessful")
})
.catch(err => console.log(err));

const port=8080;

app.set("view engine","ejs");
app.set('views', path.join(path.dirname("app.js"), 'views'));

app.use(express.static(path.join(path.dirname('app.js'),'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Root route
app.get("/", (req,res) => {
        console.log("responce recieved");
        res.redirect("/listings");
});

// Index route
app.get("/listings", async (req,res) => {
        const allListings= await Listing.find({});
        res.render("./listings/index.ejs", {allListings});
});

// New route
app.get("/listings/new", (req,res) => {
        res.render("./listings/new.ejs")
});

// Create route
app.post("/listings", async (req,res) => {
        const listing =req.body.listing;
        let newListing = new Listing({
                title : listing.title,
                image : {
                        filename: listing.filename,
                        url: listing.url
                },
                description : listing.description,
                price : listing.price,
                location : listing.location,
                country : listing.country
        });
        await newListing.save();
        res.redirect("/listings");
});

// Edit route
app.get("/listings/:id/edit", async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", {listing});
});

// Show route
app.get("/listings/:id", async (req,res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("./listings/show.ejs", { listing });
});

// Update route
app.put("/listings/:id", async (req,res) =>  {
        const { id } = req.params;
        const updateListing =req.body.listing;
        const listing = await Listing.findByIdAndUpdate(id, updateListing);
        res.redirect("/listings");
});

// Delete route
app.delete("/listings/:id", async (req,res) => {
        const { id } = req.params;
        await Listing.deleteOne({ _id : id });
        res.redirect("/listings");
});

// testListing route
// app.get("/testListing", async (req,res) =>{
//         let sampleLinsting = new Listing({
//                 title : "My new villa",
//                 description : "By the beach",
//                 price : 1200,
//                 location : "calangute ,Goa",
//                 country : "India"
//         })
//         await sampleLinsting.save();
//         console.log("Sample saved");
//         res.send("Testing successful");
// });

app.use((err, req, res, next) => {
        res.send("Something Went WRONG!");
});

app.listen(port, ()=>{
        console.log(`app is running on port:${port}`);
});