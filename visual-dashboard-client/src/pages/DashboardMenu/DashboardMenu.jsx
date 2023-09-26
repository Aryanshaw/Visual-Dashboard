import React, { useState, useEffect, useRef } from "react";
import "./DashboardMenu.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import BarChart from "../../components/Charts/Barchart";
import PieChart from "../../components/Charts/Piechart";
import DataTable from "../../components/Tables/Table";
import LineChart from "../../components/Charts/Linechart";
import DataFilter from "../../components/Filters/DataFilter";
import { useNavigate } from "react-router-dom";

const DashboardMenu = () => {
  const [menuData, setmenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [filteredBarChartData, setFilteredBarChartData] = useState(menuData);
  const [filteredPieChartData, setFilteredPieChartData] = useState(menuData);
  const [filteredLineChartData, setFilteredLineChartData] = useState(menuData);
  const navigation = useNavigate();

  const fetchAllMenuData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("/menu/dashboard-menu");
      setmenuData(result.data);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllMenuData();
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    try {
      const res = axios.post("/auth/logout");
      console.log(res);
      localStorage.removeItem("loggedin");
      setLogoutSuccess(true);
    } catch (err) {
      console.log("err", err);
    }
    setIsLoading(false);
  };

  const isLoggedIn = localStorage.getItem("loggedin");

  useEffect(() => {
    if (isLoggedIn === null && logoutSuccess === true) {
      navigation("/", { replace: true });
    }
  }, [isLoggedIn === null]);

  const handleBarChartFilter = (filteredData) => {
    setFilteredBarChartData(filteredData);
  };

  const handlePieChartFilter = (filteredData) => {
    setFilteredPieChartData(filteredData);
  };
  const handleLineChartFilter = (filteredData) => {
    setFilteredLineChartData(filteredData);
  };

  if (isLoading) {
    return <p style={{ display: "grid", placeItems: "center",height:"100vh" }}>Loading...</p>;
  }

  return (
    <div>
      <Sidebar>
        <div className="dashboard-container">
          <div>
            {/*      navbar          */}
            <div className="navbar">
              <h2 className="left-element">Dashboard</h2>
              <div className="right-component">
                <input type="text" className="searchbar" placeholder="Search" />
                {/* <Image
                  src={session.data.user.image}
                  width={35}
                  height={35}
                  alt="user"
                  style={{ borderRadius: "50%" }}
                /> */}
                <button className="signOut" onClick={handleLogout}>
                  logout
                </button>
              </div>
            </div>

            {/* top components */}
            <div className="top-component">
              {menuData.slice(0, 4).map((item) => (
                <div className="indiviualComponent" key={item._id}>
                  <span
                    className="topic"
                    style={{ textTransform: "uppercase" }}
                  >
                    {item.topic}
                  </span>
                  <span className="price">{item.insight}</span>
                  <span className="tags">
                    {item.pestle} , {item.sector}
                  </span>
                  <span className="source">Source: {item.source}</span>
                  <span className="title">{item.title}</span>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Click to read full article
                  </a>
                  <div className="increasecomponent">
                    <span className="increase">
                      Intensity: {item.intensity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* charts and tables  */}
            <div className="barchartContainer">
              <h4 style={{ marginLeft: "20px" }}>
                Intensity and Sector report
              </h4>
              <DataFilter
                data={menuData}
                onFilter={handleBarChartFilter}
                property="sector"
              />
              <BarChart
                data={
                  filteredBarChartData.length > 0
                    ? filteredBarChartData
                    : menuData
                }
              />
            </div>

            <div className="lowercontainer">
              <div className="column pieChartContainer">
                <h4 style={{ marginLeft: "20px" }}>
                  Region and likelihood report
                </h4>
                <div>
                  <DataFilter
                    data={menuData}
                    onFilter={handlePieChartFilter}
                    property="region"
                  />
                </div>
                <PieChart
                  data={
                    filteredPieChartData.length > 0
                      ? filteredPieChartData
                      : menuData
                  }
                />
              </div>
              <div className="column tableContainer">
                <h4 style={{ marginLeft: "20px" }}>Visual report</h4>
                <DataTable data={menuData} className="datatable" />
              </div>
            </div>

            <div className="barchartContainer">
              <h4 style={{ marginLeft: "20px" }}>
                Topics and relevance report
              </h4>
              <DataFilter
                data={menuData}
                onFilter={handleLineChartFilter}
                property="topic"
              />
              <LineChart
                data={
                  filteredLineChartData.length > 0
                    ? filteredLineChartData
                    : menuData
                }
              />
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default DashboardMenu;
