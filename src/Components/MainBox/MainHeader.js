import React from "react";
import "./MainHeader.css";
import { IconButton } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";

const MainHeader = () => {
  return (
    <div className="main_header">
      <div className="left_main_header">
        <Checkbox className="show_header" />
        <IconButton className="show_header">
          <ArrowDropDownIcon />
        </IconButton>
        <IconButton>
          <RedoIcon />
        </IconButton>
        <IconButton className="show_header">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="right_main_header">
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
        <IconButton className="show_header">
          <KeyboardHideIcon />
        </IconButton>
        <IconButton className="show_header">
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MainHeader;
