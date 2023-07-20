const mongoose = require('mongoose');

const mongoURI = 'mongodb://0.0.0.0:27017/inotebook';
const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
   .then(()=>{console.log("connected")}).catch((err)=>{
   console.log(err)
   })

}

module.exports = connectToMongo;
 
