const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create geolocation schema
const GeoSchema = new Schema({
    type: {  //Type of Coordinate in the map
        type: String, //Type of data that the type property is which is a string.
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// Create ninja Schema & model;
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    // add in geo location.
    geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;