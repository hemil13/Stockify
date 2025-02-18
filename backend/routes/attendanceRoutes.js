const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceModel'); // Make sure you have the Attendance model defined

// POST request to add attendance
router.post('/addAttendance', async (req, res) => {
  try {
    // const { employeeName, attendanceDate, attendanceStatus } = req.body;

    // const newAttendance = new Attendance({
    //   employeeName,
    //   attendanceDate,
    //   attendanceStatus,
    // });

    // await newAttendance.save();
    res.status(201).json("Hello");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to edit attendance
router.put('/editAttendance/:id', async (req, res) => {
  try {
    const { employeeName, attendanceDate, attendanceStatus } = req.body;

    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });

    attendance.employeeName = employeeName;
    attendance.attendanceDate = attendanceDate;
    attendance.attendanceStatus = attendanceStatus;

    await attendance.save();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to delete attendance
router.delete('/deleteAttendance/:id', async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    

    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET request to fetch all attendance
router.get('/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
