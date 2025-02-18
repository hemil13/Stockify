// import React, { useState, useEffect } from 'react';
// import './attendanceManagement.css';
// import axios from 'axios';

// const AttendanceManagement = () => {
//   const today = new Date().toISOString().split('T')[0];

//   const [employeeName, setEmployeeName] = useState('');
//   const [attendanceDate, setAttendanceDate] = useState(today);
//   const [attendanceStatus, setAttendanceStatus] = useState('Present');
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [editId, setEditId] = useState(null); // Store the ID of the record being edited

//   // Fetch attendance data
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/attendance/attendance');
//         console.log("Fetched Attendance Data:", response.data); // Debugging
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   const handleAddAttendance = async (e) => {
//     e.preventDefault();

//     if (!employeeName || !attendanceDate || !attendanceStatus) {
//       alert('Please fill all the fields');
//       return;
//     }

//     try {
//       const newAttendance = { employeeName, attendanceDate, attendanceStatus };

//       // If editing, update the attendance
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/attendance/editAttendance/${editId}`, newAttendance);
//         setEditId(null);
//       } else {
//         // If not editing, add new attendance
//         await axios.post('http://localhost:5000/api/attendance/addAttendance', newAttendance);
//       }

//       // Fetch updated attendance data
//       const updatedData = await axios.get('http://localhost:5000/api/attendance/attendance');
//       setAttendanceData(updatedData.data);

//       // Reset form
//       setEmployeeName('');
//       setAttendanceDate(today);
//       setAttendanceStatus('Present');
//     } catch (error) {
//       console.error('Error adding/editing attendance', error);
//     }
//   };

//   const handleEdit = (attendance) => {
//     setEmployeeName(attendance.employeeName);
//     setAttendanceDate(attendance.attendanceDate);
//     setAttendanceStatus(attendance.attendanceStatus);
//     setEditId(attendance._id); // Set the edit ID
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/attendance/deleteAttendance/${id}`);
//       const updatedData = await axios.get('http://localhost:5000/api/attendance/attendance');
//       setAttendanceData(updatedData.data);
//     } catch (error) {
//       console.error('Error deleting attendance', error);
//     }
//   };
  

//   return (
//     <div className="attendance-management-container">
//       <form className="attendance-form" onSubmit={handleAddAttendance}>
//         <h2>{editId ? 'Edit Attendance' : 'Add Attendance'}</h2>
//         <div className="dropdown-container">
//             <select
//               value={employeeName}
//               onChange={(e) => setEmployeeName(e.target.value)}
//             >
//               <option value="" selected hidden disabled>--select--</option>
//               <option value="EMP A">EMP A</option>
//               <option value="EMP B">EMP B</option>
//               <option value="EMP C">EMP C</option>
//               <option value="EMP D">EMP D</option>
//             </select>
//           </div>
        
//         <input
//           type="date"
//           value={attendanceDate}
//           onChange={(e) => setAttendanceDate(e.target.value)}
//         />

//         <div className="dropdown-container">
//           <select
//             value={attendanceStatus}
//             onChange={(e) => setAttendanceStatus(e.target.value)}
//           >
//             <option value="Present">Present</option>
//             <option value="Half Day">Half Day</option>
//             <option value="Absent">Absent</option>
//           </select>
//         </div>

//         <button type="submit">{editId ? 'Update Attendance' : 'Add Attendance'}</button>
//       </form>

//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Attendance Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.length > 0 ? (
//             attendanceData.map((attendance) => (
//               <tr key={attendance._id}>
//                 <td>{attendance.employeeName || attendance.name}</td>
//                 <td>{attendance.attendanceDate || attendance.date}</td>
//                 <td>{attendance.attendanceStatus || attendance.status}</td>
//                 <td>
//                   <button className="edit-button" onClick={() => handleEdit(attendance)}>Edit</button>
//                   <button className="delete-button" onClick={() => handleDelete(attendance._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceManagement;



















import React, { useState, useEffect } from 'react';
import './attendanceManagement.css';
import axios from 'axios';

const AttendanceManagement = () => {
  const today = new Date().toISOString().split('T')[0];

  const [employeeName, setEmployeeName] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [attendanceData, setAttendanceData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month


  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance/attendance');
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  const handleAddAttendance = async (e) => {
    e.preventDefault();

    if (!employeeName || !attendanceDate || !attendanceStatus) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const newAttendance = { employeeName, attendanceDate, attendanceStatus };

      if (editId) {
        await axios.put(`http://localhost:5000/api/attendance/editAttendance/${editId}`, newAttendance);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/attendance/addAttendance', newAttendance);
      }

      const updatedData = await axios.get('http://localhost:5000/api/attendance/attendance');
      setAttendanceData(updatedData.data);
      setEmployeeName('');
      setAttendanceDate(today);
      setAttendanceStatus('Present');
    } catch (error) {
      console.error('Error adding/editing attendance', error);
    }
  };

  const handleEdit = (attendance) => {
    setEmployeeName(attendance.employeeName);
    setAttendanceDate(attendance.attendanceDate);
    setAttendanceStatus(attendance.attendanceStatus);
    setEditId(attendance._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendance/deleteAttendance/${id}`);
      const updatedData = await axios.get('http://localhost:5000/api/attendance/attendance');
      setAttendanceData(updatedData.data);
    } catch (error) {
      console.error('Error deleting attendance', error);
    }
  };

  const calculateSummary = () => {
    const selectedMonthStr = selectedMonth; // YYYY-MM


    const filteredData = attendanceData.filter(att =>
      att.attendanceDate.startsWith(selectedMonthStr)
    );

    console.log(selectedMonthStr);
    console.log(filteredData);

    const summary = {};

    filteredData.forEach(att => {
      const name = att.employeeName || att.name;
      const status = att.attendanceStatus || att.status;
      if (!summary[name]) summary[name] = 0;

      if (status === 'Present') summary[name] += 1;
      else if (status === 'Half Day') summary[name] += 0.5;
      else if (status === 'Absent') summary[name] += 0;
    });

    console.log(summary);

    const summaryArray = Object.entries(summary).map(([name, total]) => ({
      name,
      total
    }));

    setSummaryData(summaryArray);
    setShowSummary(!showSummary);
  };

  return (
    <div className="attendance-management-container">
      <form className="attendance-form" onSubmit={handleAddAttendance}>
        <h2>{editId ? 'Edit Attendance' : 'Add Attendance'}</h2>
        <div className="dropdown-container">
          <select value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}>
            <option value="" selected hidden disabled>--select--</option>
            <option value="EMP A">EMP A</option>
            <option value="EMP B">EMP B</option>
            <option value="EMP C">EMP C</option>
            <option value="EMP D">EMP D</option>
          </select>
        </div>

        <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />

        <div className="dropdown-container">
          <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Half Day">Half Day</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit">{editId ? 'Update Attendance' : 'Add Attendance'}</button>
      </form>

      <div className="month-picker-container">
        <label htmlFor="monthPicker">Select Month:</label>
        <input
          type="month"
          id="monthPicker"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>


      <button className="summary-button" onClick={calculateSummary}>
        {showSummary ? 'Hide Attendance Summary' : 'Show Attendance Summary'}
      </button>

      {showSummary && (
        <table className="attendance-table summary-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Total Attendance (Last Month)</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.length > 0 ? (
              summaryData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Attendance Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((attendance) => (
              <tr key={attendance._id}>
                <td>{attendance.employeeName || attendance.name}</td>
                <td>{attendance.attendanceDate || attendance.date}</td>
                <td>{attendance.attendanceStatus || attendance.status}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(attendance)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(attendance._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceManagement;
