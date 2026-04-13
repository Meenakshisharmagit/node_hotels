const mongoose=require('mongoose');

//const mongoURL='mongodb://localhost:27017/hotels'
const mongoURL=process.env.MONGODB_URL;

//set up mongoose connection
// Correct Way (Mongoose 6+ ke liye)
mongoose.connect('mongodb://localhost:27017/hotels')
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB:", err));

//get default connection
const db=mongoose.connection;
//define event listner

db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',()=>{
    console.log('mongodb connection error')
})
db.on('disconnected',()=>{
    console.log('mongodb disconnected')
})

//export database connection
module.exports=db