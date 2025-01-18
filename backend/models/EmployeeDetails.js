const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  dob: { type: Date },
  dateOfJoining: { type: Date },
  photo: { type: String }, // Store file path or URL
  address: { type: String },
  salary: { type: Number },
  designation: { type: String },
});

module.exports = mongoose.model('EmployeeDetails', employeeSchema);

