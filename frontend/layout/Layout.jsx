import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";


const Layout = ({ children }) => {
  return (
    <div className="flex w-screen min-h-screen bg-[#f4f7fe] overflow-x-hidden">
      {/* Sidebar - Fixed to left */}
      <div className="w-64 text-white min-h-screen fixed top-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col flex-1 min-h-screen">
        {/* Navbar */}
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>

        {/* Dynamic Content */}
        <div className="p-6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
