const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TrackSchema = new Schema({
    trackname: String,
    bars: Number,
    audioBlobURL: String,
    treble: Number,
    middle: Number,
    bass: Number,
    panning: Number

})

LoopSchema = new Schema({
    loopname: String,
    bpm: Number,
    tracks: [TrackSchema]

})

UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    loops: [LoopSchema]
})

const User = mongoose.model('user', UserSchema);

module.exports = User;