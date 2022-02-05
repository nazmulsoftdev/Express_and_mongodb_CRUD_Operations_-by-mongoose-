const { Schema, model } = require("mongoose");

// define the shape of Schema and  mongoose  model

const Student = model(
  "Student",
  Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 20 },
    hobbies: {
      type: Array,
      of: String,
      validate: {
        validator: (value) => value.length > 0,
        message: "There must be at least 1 hobby!",
      },
    },
  })
);

exports.Student = Student;
