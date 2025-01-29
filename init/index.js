import { Listing } from "../models/listing.js";
import  { sampleListings }  from "./data.js";

import mongoose from 'mongoose';

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

main().then( () => {
        console.log("Connection Seccessful")
})
.catch(err => console.log(err));

const initDb = async () => {
        await Listing.deleteMany({});
        console.log("before");
        console.log(sampleListings[0]);
        const modifiedListings = sampleListings.map((obj) => ({...obj, owner : "676a91ee175226ad1ae03911",}));
        console.log("after");
        console.log(modifiedListings[0]);
        await Listing.insertMany(modifiedListings);
        console.log("Data is initialized");
};

initDb();