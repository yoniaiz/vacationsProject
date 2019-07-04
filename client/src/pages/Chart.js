import React, { Component } from "react";
import { host } from "../User";
import socketIOClient from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/mainPageStyle.css";
import { Background } from "../styles/Background.js.js";

class Chart extends Component {
  state = {
    vacations: [],
    w: window.innerWidth - window.innerWidth / 10,
    h: window.innerHeight - window.innerHeight / 10,
    host: host
  };
  reportWindowSize = () => {
    let h = window.innerHeight - window.innerHeight / 10;
    let w = window.innerWidth - window.innerWidth / 10;
    this.setState({ h, w });
  };
  componentDidMount = async () => {
    window.onresize = this.reportWindowSize;
    const socket = socketIOClient(this.state.host);
    socket.on("like", () => {
      this.getVicationsChart();
    });
    this.getVicationsChart();
  };

  getVicationsChart = async () => {
    let vacations = await axios.get("http://localhost:8080/getVacationChart");
    let chartVacations = vacations.data.map(vac => {
      let newVac = {
        name: vac.name,
        Followers: vac.num,
        pv: 2400,
        amt: 2400
      };
      return newVac;
    });
    this.setState({ vacations: chartVacations });
  };

  render() {
    var centerCon = {
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: "80px",
      paddingBottom: "70px"
    };
    var background = new Background("#b2cecf");
    return (
      <div className="background p-0 m-0" style={background}>
        <div
          className="container-fluid p-0 m-0"
          style={{
            height: "100vh",
            width: "100vw",
            textAlign: "center"
          }}
        >
          <h1 className="chartTitle">Followers status</h1>
          <hr
            style={{
              borderColor: "#50d07d"
            }}
          />
          <div className="container-fluid m-0" style={centerCon}>
            <BarChart
              width={this.state.w}
              height={this.state.h}
              data={this.state.vacations}
            >
              <XAxis dataKey="name" stroke="#d02552" />
              <YAxis />
              <Tooltip
                wrapperStyle={{
                  width: 120,
                  backgroundColor: "#ccc",
                  color: "#50d07d"
                }}
              />
              <Legend
                width={150}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d02552",
                  borderRadius: 3,
                  lineHeight: "40px"
                }}
              />
              <CartesianGrid
                stroke="rgba(208, 37, 82,0.2)"
                strokeDasharray="5 5"
              />
              <Bar
                type="monotone"
                dataKey="Followers"
                fill="#d02552"
                barSize={40}
              />
            </BarChart>
          </div>
          <div className="row">
            <Link
              className="offset-xl-5 offset-lg-5 offset-md-4 offset-2"
              to="/"
              style={{
                position: "absolute",
                top: "94vh"
              }}
            >
              <button
                className="btn btn-outline-success btn-block"
                style={{
                  width: "270px"
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Chart;
