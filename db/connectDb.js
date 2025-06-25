const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


const connectDb = async (DATABASEURL) => {
    try {
        const db_options={
            user:process.env.DB_USERNAME,  
            pass:process.env.DB_PASSWORD, 
            dbName:process.env.DB_NAME,   
            authSource:"studentcurd", // Specify the authentication database
          
        }
        // console.log('Connecting to database...', DATABASEURL, db_options);
        await mongoose.connect(DATABASEURL, db_options);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }

}

module.exports = connectDb;