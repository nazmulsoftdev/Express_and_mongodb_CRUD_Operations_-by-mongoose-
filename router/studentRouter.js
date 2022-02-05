const express = require("express");
const { Student } = require("../models/student");
const router = express.Router();

// show all student data => by this request

const studentList = async (req, res) => {
  try {
    const student = await Student.find().select({
      name: 1,
      age: 1,
    });
    res.send(student);
  } catch (err) {
    return res.status(400).send("Something is wrong !");
  }
};

// add new student data in database => by this request

const newStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const result = await student.save();
    res.send(result);
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

// see specific student data in database => by this request

const studentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) res.status(400).send("This user id not found !");
    res.send(student);
  } catch (err) {
    return res.status(400).send("This user id not found !");
  }
};

// edit specific student data in database => by this request

const studentUpdate = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!student) res.status(400).send("This user id not found");
    res.send(student);
  } catch (err) {
    return res.status(400).send("This user id not found !");
  }
};

// Delete specific student data in database => by this request

const studentDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) res.status(400).send("This user id not found");
    res.send(student);
  } catch (err) {
    return res.status(400).send("This user id not found !");
  }
};

// this is express routing for request parameter

router.route("/").get(studentList).post(newStudent);

router
  .route("/:id")
  .get(studentDetail)
  .put(studentUpdate)
  .delete(studentDelete);

module.exports = router;
