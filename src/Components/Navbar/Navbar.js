import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import logo from "../../images/gmail.png";
import { IconButton } from "@material-ui/core";
import "./Navbar.css";
import { auth, db } from "../../firebase";
import {
  logout,
  selectuser,
  setSideBar,
  selectslideBar,
  setDarkMode,
} from "./../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";

const Navbar = () => {
  const [searchItems, setSearchItems] = useState("");
  const user = useSelector(selectuser);
  const slideBar = useSelector(selectslideBar);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };
  const showProfileBox = () => {
    const elem = document.querySelector(".profileBox");
    elem.classList.toggle("showProfileBox");
  };
  const slideBarToggle = () => {
    dispatch(
      setSideBar({
        item: !slideBar,
      })
    );
  };
  const selectLightMode = () => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var id = doc.id;
          var data = doc.data();
          if (data?.uid === auth?.currentUser?.uid) {
            db.collection("users").doc(id).update({
              darkMode: false,
            });
          }
        });
      });
    const lightBtn = document.querySelector(".light_mode");
    const darkBtn = document.querySelector(".dark_mode");
    lightBtn.style.backgroundColor = "white";
    darkBtn.style.backgroundColor = "black";
    lightBtn.style.color = "black";
    darkBtn.style.color = "white";
    dispatch(
      setDarkMode({
        darkMode: false,
      })
    );
  };
  const selectDarkMode = () => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var id = doc.id;
          var data = doc.data();
          if (data?.uid === auth?.currentUser?.uid) {
            db.collection("users").doc(id).update({
              darkMode: true,
            });
          }
        });
      });
    const lightBtn = document.querySelector(".light_mode");
    const darkBtn = document.querySelector(".dark_mode");
    lightBtn.style.backgroundColor = "black";
    darkBtn.style.backgroundColor = "white";
    lightBtn.style.color = "white";
    darkBtn.style.color = "black";
    dispatch(
      setDarkMode({
        darkMode: true,
      })
    );
  };
  const searchMail = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="navbar">
        <div className="left_side">
          <IconButton onClick={slideBarToggle} className="showIcon toggleBtn">
            <MenuIcon className="onofBtn" />
          </IconButton>
          <img src={logo} alt="gmail_logo" />
        </div>
        <div className="middle_side">
          <IconButton>
            <SearchIcon value={searchItems} onChange={searchMail} />
          </IconButton>

          <input placeholder="Search mail" type="text" />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
        </div>
        <div className="right_side">
          <IconButton>
            <AppsIcon />
          </IconButton>
          <IconButton>
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton onClick={showProfileBox} className="my_Profile showIcon">
            <Avatar src={user.photo} alt="userpic.jpg" />
          </IconButton>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </div>
      </div>
      <div className="profileBox">
        <div className="apply_theame">
          <button className="light_mode" onClick={selectLightMode}>
            Light
          </button>
          <button className="dark_mode" onClick={selectDarkMode}>
            Dark
          </button>
        </div>

        <img alt="userpic.jpg" src={user.photo} />
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>

        <button className="manageBtn">Manage your Google Account</button>
        <button className="signoutBtn" onClick={signOut}>
          SignOut
        </button>
      </div>
    </>
  );
};

export default Navbar;
