const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    enum: ['EMP A', 'EMP B', 'EMP C', 'EMP D'],
  },
  attendanceDate: {
    type: String,  
    required: true
  },
  attendanceStatus: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Half Day'], 
    default: 'Present'
  }
}, {
  timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
