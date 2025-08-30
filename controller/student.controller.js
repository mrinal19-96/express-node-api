    

const Student = require('../models/Student.model.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { log } = require('console');





function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}




// get all students

    let studentList = async (req, res) => {
    try {
        const {page = 1, limit =3} = req.query;
        const options = {
            page:parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 } // Sort by createdAt in descending order
        };
        // const students = await Student.find()
        const students = await Student.paginate({}, options);
        // console.log('Students:', students);
        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }


        res.status(201).json({
            message: "Get all students successfully",
            total: students.totalDocs,
            page: students.page,    
            totalPages: students.totalPages,
            limit: students.limit,
            hasNextPage: students.hasNextPage,
            hasPrevPage: students.hasPrevPage,
            nextPage: students.nextPage,
            prevPage: students.prevPage,
            currentPage: students.page,
            students: students.docs, 
        
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Create a new student
let addStudent =  async (req, res) => {
    try {
        // const newstudent = await Student.create(req.body);
        const student = new Student(req.body);
        if (req.file) {
            student.profile_picture = req.file.filename;
        }
        const newstudent = await student.save();
        res.status(201).json({
            message: "Student created successfully",
            student: newstudent
        });


    } catch (error) {
        if (error.name === 'ValidationError') {
            const formattedErrors = {}
            for (const field in error.errors) {
                formattedErrors[field] = error.errors[field].message;
            }
            return res.status(400).json({ message: 'Validation error', errors: formattedErrors });

        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];

            return res.status(400).json({ error: { [field]: `${capitalize(field)} "${value}" aleady exits!` } });
        }


        // if(error.name === 'CastError') {
        //     return res.status(400).json({ message: 'Invalid data format' });
        // }

        res.status(400).json({ message: error.message });
    }
}

// edit a student by ID
let editStudent =  async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update a student by ID

let updateSudent =  async (req, res) => {
  const id = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    if (req.file && req.file.filename) {
      const invalidFilePath = path.join(__dirname, '../uploads', req.file.filename);
      fs.unlink(invalidFilePath, (err) => {
        if (err) console.error('Error deleting uploaded file for invalid ID:', err);
      });
    }
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const exitstudent = await Student.findById(id);
    // console.log('Existing student:', exitstudent);

    if (!exitstudent) {
      if (req.file && req.file.filename) {
        const filePath = path.join(__dirname, '../uploads', req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting uploaded file:', err);
          }
        });
      }
      return res.status(404).json({ message: 'Student not found' });
    }

    // If new image uploaded, delete the old one
    if (req.file && req.file.filename) {
      if (exitstudent.profile_picture) {
        const oldFilePath = path.join(__dirname, '../uploads', exitstudent.profile_picture);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error('Error deleting old profile picture:', err);
          }
        });
      }
      req.body.profile_picture = req.file.filename;
    } else {
      // Don't overwrite profile_picture if not sent
      delete req.body.profile_picture;
    }

   
    const updatedstudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      message: 'Student updated successfully',
      student: updatedstudent
    });

  } catch (error) {
    console.error('Update failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


// Delete a student by ID
let deleteStudent = async (req, res) => {
    try {
        const deletedstudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedstudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Delete the profile picture file if it exists
        if (deletedstudent.profile_picture) {
            const filePath = path.join('./uploads', deletedstudent.profile_picture);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting profile picture:', err);
                }
            });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {studentList,addStudent,editStudent,updateSudent,deleteStudent}

