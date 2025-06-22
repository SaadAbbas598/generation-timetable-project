import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBook,
  FaClock,
  FaDoorClosed,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
  FaChalkboardTeacher
} from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
    { name: 'Teachers', icon: <FaChalkboardTeacher />, path: '/teachers' },
    { name: 'Subjects', icon: <FaBook />, path: '/subjects' },
    { name: 'Slots', icon: <FaClock />, path: '/slots' },
    { name: 'Rooms', icon: <FaDoorClosed />, path: '/rooms' },
    { name: 'Timetable', icon: <FaCalendarAlt />, path: '/timetable' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-3 fixed top-0 left-0 z-50">
        <button onClick={() => setOpen(!open)} className="text-white text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#152055] to-[#0f1b42] text-white p-4 z-40 transform transition-transform duration-300 ${
          open ? 'translate-x-0 w-56' : '-translate-x-full w-0'
        } md:translate-x-0 md:w-56`}
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="text-2xl">📅</div>
          <h3 className="text-sm font-semibold tracking-wide mt-1">TIMETABLE</h3>
          <p className="text-[11px] text-white">MANAGEMENT</p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition text-sm ${
                  isActive
                    ? 'bg-[#1e2a5a] text-white font-semibold'
                    : 'hover:bg-[#253468] text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="text-base text-white">{item.icon}</span>
                <span className="text-white">{item.name}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-md transition hover:bg-[#253468] text-white text-sm cursor-pointer mt-4"
          >
            <span className="text-base text-white"><FaSignOutAlt /></span>
            <span className="text-white">Logout</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
