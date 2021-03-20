import React from 'react';
import styled from 'styled-components';
import Button from "../../../components/CustomButton/CustomButton.jsx";
import { NavLink } from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  padding: 0px 0px;
  position: relative;
  top: -50px;
  right: 0px;
  align-items: center;

  li {
    padding: 10px;
  }

  
  @media (max-width: 1200px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: relative;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    padding: 10px 30px;
    z-index: 100;
    width: 256px;
    height: 355px;
    right: -15px;
    top: -5px;
    background: linear-gradient(180deg, #9ECD51 0%, #638F1B 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
      width: 100%;
    }

    li {
      padding: 12px 0px;
      color: white;
      border-bottom: #9CD146 solid 1px;
    }

    li:last-of-type {
      border-bottom: none;
    }

    li a span {
      color: white !important;
    }

    a.link_as_btn {
        border: none !important;
        background: none !important;
        padding-left: 0px !important;
        min-width: 0px !important;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open} >
      <li>
        <a href={"/login"}>
          <span className="navbar-name">News</span>
        </a>
      </li>
      <li>
        <NavLink to={"/login"}>
          <span className="navbar-name">Categories</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>
          <span className="navbar-name">Companies</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>
          <span className="navbar-name">Jobs</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>
          <span className="navbar-name">Search</span>
        </NavLink>
      </li>
      <li>
        <a href={"/login"}>
          <span className="navbar-name">Contact us</span>
        </a>
      </li>
      <li className="btn-padding">
          {/* <Button bsStyle="success" fill >Join now</Button> */}
        <a href={"/login"} className="link_as_btn btn apply-button">
          <span className="navbar-name">Join Now</span>
        </a>
      </li>

    </Ul>
  )
}

export default RightNav