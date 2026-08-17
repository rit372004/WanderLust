const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing){
      await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


// filename: {
//       type: String,
//       default: "listingimage"
//     },
//     url: {
//       type: String,
//       default: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
//       set: (v) => v === "" 
//       ? "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
//       : v,
//     }