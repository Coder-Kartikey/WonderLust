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
        await Listing.insertMany(sampleListings);
        console.log("Data is initilised");
};

initDb();