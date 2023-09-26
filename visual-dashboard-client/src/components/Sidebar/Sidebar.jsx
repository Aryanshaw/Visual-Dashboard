import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const menu = [
    {
      id: 1,
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      id: 2,
      title: "Transaction",
      url: "/transaction",
    },
    {
      id: 3,
      title: "Schedules",
      url: "/schedules",
    },
    {
      id: 4,
      title: "Users",
      url: "/users",
    },
    {
      id: 5,
      title: "Settings",
      url: "/settings",
    },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      <button
        className={`menu-toggle ${isSidebarOpen ? "open" : "close"}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>
      <div className={`menu ${isSidebarOpen ? "open" : ""}`}>
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ textAlign: "center", color: "white" }} className="board">
            Board.
          </h3>
        </div>
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
          </div>
        ))}
        <div className="lower">
          help
          <br />
          <br />
          contact-us
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
