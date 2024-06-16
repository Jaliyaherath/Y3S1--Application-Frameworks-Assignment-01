const mongoose = require('mongoose');
const colors=require('colors');//Add colors to the console

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            console.log(`MongoDB Connected`.green.bold)    
    }catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        
    }
}
module.exports = connectDB;
