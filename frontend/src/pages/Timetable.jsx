import React from 'react';
import Layout from '../../layout/Layout';

const Timetable = () => {
  const teachers = ['Sophia Martinez', 'James Johnson', 'Olivia Brown', 'William Taylor'];
  const days = ['Monday', 'Tuesday', 'Thursday', 'Friday'];

  return (
    <Layout>
      <div className="p-4 max-w-full mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray mb-2 md:mb-0">
            Timetable Generation
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-gray font-medium py-2 px-4 rounded">
            Check Teacher
          </button>
        </div>

        {/* Dropdown for selecting teacher */}
        <div className="mb-4">
          <select className="w-full p-2 rounded border bg-white text-black">
            <option>James Johnson</option>
            {/* Add more teacher options here */}
          </select>
        </div>

        {/* Timetable table */}
        <div className="overflow-auto rounded-lg">
          <table className="w-full text-sm md:text-base text-left bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2">Select Teacher</th>
                {days.map(day => (
                  <th key={day} className="p-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{teacher}</td>
                  {days.map(day => (
                    <td key={day} className="p-2">
                      <select className="w-full p-1 rounded border bg-white text-black mb-1">
                        <option>Select Subject</option>
                        {/* Add subject options */}
                      </select>
                      <select className="w-full p-1 rounded border bg-white text-black">
                        <option>Select Room</option>
                        {/* Add room options */}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Timetable;
