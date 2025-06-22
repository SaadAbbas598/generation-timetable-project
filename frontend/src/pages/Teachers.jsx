import React from 'react';
import Layout from '../../layout/Layout';

const Teachers = () => {
  const teacher = {
    name: 'Saad Abbas',
    email: 'saad.abbas@example.com',
    department: 'Computer Science',
  };

  const schedule = [
    { day: 'Monday', time: '9:00 AM - 10:00 AM', subject: 'Data Structures', room: 'Room 101' },
    { day: 'Tuesday', time: '11:00 AM - 12:00 PM', subject: 'Operating Systems', room: 'Room 202' },
    { day: 'Wednesday', time: '2:00 PM - 3:00 PM', subject: 'Databases', room: 'Room 103' },
    { day: 'Thursday', time: '10:00 AM - 11:00 AM', subject: 'Web Development', room: 'Lab 1' },
    { day: 'Friday', time: '12:00 PM - 1:00 PM', subject: 'Computer Networks', room: 'Room 105' },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>

      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">Welcome, {teacher.name}</h2>
        <p><span className="font-medium text-gray-700">Email:</span> {teacher.email}</p>
        <p><span className="font-medium text-gray-700">Department:</span> {teacher.department}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Your Timetable</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="py-2 px-4 border">Day</th>
                <th className="py-2 px-4 border">Time Slot</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Room</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="text-sm text-gray-700 hover:bg-blue-50">
                  <td className="py-2 px-4 border">{item.day}</td>
                  <td className="py-2 px-4 border">{item.time}</td>
                  <td className="py-2 px-4 border">{item.subject}</td>
                  <td className="py-2 px-4 border">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Download Timetable
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            View as Calendar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
