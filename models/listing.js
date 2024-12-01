import mongoose from 'mongoose';

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
                        default : "https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo",
                        set : ( v ) =>
                        v === "" 
                                ? 'https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo' 
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
        }
});

export const Listing = mongoose.model('Listing', listingSchema);