const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
 
    player_id: Number,
    name: String, 
    number: String, 
    position: String,
    currentTeam: String, 
    playerHeadShot: String, 
    height: String, 
    weight: String,
    birthDate: String, 
    college: String,
    draftInfo: String, 
    status: String,

})


const Card = mongoose.model("Card", cardSchema)

module.exports = mongoose.model("Card", cardSchema)


