const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    titletrip: String,
    country: String,
    accommodation: String,
    transportation: String,
    eat: String,
    day: String,
    night: String,
    date: Date,
    price: String,
    quota: Number,
    description: String,
    image: String,

});

const Trips = mongoose.model('Trips', tripSchema);

module.exports = Trips;