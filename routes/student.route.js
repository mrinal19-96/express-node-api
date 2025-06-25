const express = require('express');
const router = express.Router();

const Student = require('../models/Student.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const {studentList,addStudent,editStudent, updateSudent,deleteStudent} = require('../controller/student.controller.js');


// image upload configuration

// const storage = multer.diskStorage({
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newfilename = Date.now() + path.extname(file.originalname);
        cb(null, newfilename);
    }

})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }

}


upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB  
    }
});


// Create a getall student
router.get('/',studentList );
// new student add 
router.post('/add',upload.single('profile_picture'), addStudent)

// Get a student by ID
router.get('/edit/:id',editStudent);

// update a student by ID
router.put('/update/:id', upload.single('profile_picture'),updateSudent);

// Delete a student by ID
router.delete('/delete/:id',deleteStudent);

module.exports = router;