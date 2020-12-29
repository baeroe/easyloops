const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TrackSchema = new Schema({
    trackid: String,
    trackname: String,
    numberOfBars: Number,
    audio: [String],
    volume: Number,
    treble: Number,
    middle: Number,
    bass: Number,
    panning: Number

})

LoopSchema = new Schema({
    loopid: String,
    loopname: String,
    bpm: Number,
    tracks: [TrackSchema]

})

UserSchema = new Schema({
    username: String,
    email: String,
    confirmed: Boolean,
    password: String,
    loops: [LoopSchema]
})

const User = mongoose.model('user', UserSchema);

module.exports = User;