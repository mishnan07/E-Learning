// Sidebar.js
import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen ${isOpen ? 'overflow-hidden' : ''}`}>
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white h-full w-64 fixed left-0 ${isOpen ? '' : '-left-64'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">W3Schools</h1>
        </div>
        <ul className="space-y-2">
          <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">Home</li>
          <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">HTML</li>
          <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">CSS</li>
          <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">JavaScript</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-4">
        <button className="bg-gray-800 text-white px-3 py-2" onClick={toggleSidebar}>
          Toggle Sidebar
        </button>
        {/* Your main content goes here */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Content Goes Here</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
