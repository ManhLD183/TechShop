import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: String,
    population: Number,
});

const countrySchema = new mongoose.Schema({
    name: String,
    cities: [citySchema]
});

export default mongoose.model("Country", countrySchema);
