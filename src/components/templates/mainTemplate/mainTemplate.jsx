import React from "react";
import "./mainTemplate.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function MainTemplate({ content }) {
  const appBar = (
    <div className="appBar">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        UPayments Store
      </Link>
      <span>Register</span>
    </div>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className="mainTemplateBox">
        {appBar}
        {content}
      </Container>
    </React.Fragment>

    // <div className='mainTemplateBox'>

    // </div>
  );
}
