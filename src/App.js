import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./components/Archive";
import Important from "./components/Important";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Bin from "./components/Bin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div
          className="flex-1 overflow-y-auto max-h-[calc(100vh-64px)]"
          onClick={closeSidebar}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/important" element={<Important />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/bin" element={<Bin />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
