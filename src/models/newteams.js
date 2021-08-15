const mongoose = require("mongoose");

//data for new teams
var newteamdata = new mongoose.Schema({
    teamname: {
        type:String,
        required:true
    },
    uniquecode: {
        type: Number,

 //       unique:true
    },
    date: {
        type: Date,
        required:true,
    }
})

const Newteam = new mongoose.model("myteam",newteamdata);

module.exports = Newteam;