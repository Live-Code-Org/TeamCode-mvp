const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}:${conn.connection.port}`);    
        
    } catch(err){
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    };
    
};

if (require.main === module) {
    connectDB()
};

module.exports = connectDB;
