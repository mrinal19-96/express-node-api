
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var validate = require('mongoose-validator');




var emailValidator = validate({
    validator: 'isEmail',   
    message: 'Invalid email format',
    passIfEmpty: true, // Allow empty values
});
var phoneValidator = validate({
   validator: 'isMobilePhone',  
    arguments: ['any'], // Specify the locale, e.g., 'en-US'
    message: 'Invalid phone number format',
    passIfEmpty: true, // Allow empty values
});

const mongooseSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:  [true, "First name is required"],
    },
    last_name: {
        type: String,
        required:  [true, "Last name is required"],
    },
    email: {
        type: String,
        required:  [true, "Email is required"],
        unique: true,
        validate: emailValidator, // Validate email format
    },
    phone:{
        type: String,
        required:  [true, "Phone number is required"], 
        unique: true,
        validate: phoneValidator, // Validate phone number format
    },
    gender: {
        type: String,   
        required:  [true, "Gender is required"],
        enum:["Male", 'Female', 'Other'],
    },
    profile_picture: {
        type: String,
        default: 'https://example.com/default-profile.png', // Default profile picture URL
    },



})


mongooseSchema.plugin(mongoosePaginate); // Add pagination plugin
const Student = mongoose.model('Student', mongooseSchema);
module.exports = Student;
