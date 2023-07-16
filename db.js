const { default: mongoose, Mongoose } = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/profilecards"
const mongoURI = "mongodb+srv://samadityaj:wa6p4yHum7hOiML4@cluster0.0qxzlod.mongodb.net/?retryWrites=true&w=majority"

const connect2Mongo = async ()=>{
    mongoose.connect(mongoURI)
    console.log("Db connected")
}
module.exports = connect2Mongo;
