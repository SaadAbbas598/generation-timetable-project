import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SearchProvider } from "./context/searchContext";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Slots from "./pages/Slots";
import Subjects from "./pages/Subjects";
import Teachers from "./pages/Teachers";
import Timetable from "./pages/Timetable";
import Login from "./auth/login";
import SignUp from "./auth/Singup";

function App() {
  return (
    <>
      <SearchProvider>
        <Router>
          {/* You can uncomment Sidebar and if you want it on all pages */}
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SignUp />} />



          </Routes>
        </Router>
      </SearchProvider>
    </>
  );
}

export default App;
