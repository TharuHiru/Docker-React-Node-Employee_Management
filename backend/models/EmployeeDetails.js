//Schema to store employee details in mongodb

const mongoose = require('mongoose');

const employeeschema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String },
  dob: { type: Date },
  dateOfJoining: { type: Date },
  address: { type: String },
  salary: { type: Number },
  designation: { type: String },
});

module.exports = mongoose.model('EmployeeDetails', employeeschema);

