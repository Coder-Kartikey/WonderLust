import mongoose from 'mongoose';

import { Review } from './review.js';

const listingSchema = mongoose.Schema({
        title : {
                type : String,
                required : true
        },
        description : {
                type : String
        },
        image : {
                filename :{
                        type : String
                },
                url :{
                        type : String,
                        default : "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        set : ( v ) =>
                        v === "" 
                                ? 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                                : v
                }
        },
        price : {
                type : Number
        },
        location : {
                type : String
        },
        country : {
                type : String
        },
        reviews : [
                {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : "Review"
                }
        ],
        owner : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
        }
});

listingSchema.post("findOneAndDelete", async (listing) => {
        if(listing){
                await Review.deleteMany({ _id : {$in : listing.reviews}});
        }
});

export const Listing = mongoose.model('Listing', listingSchema);