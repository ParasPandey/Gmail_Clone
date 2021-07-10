import React from "react";
import "./Sidebar.css";
import { Button, IconButton } from "@material-ui/core";
import SidebarOption from "./SidebarOption";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import SendIcon from "@material-ui/icons/Send";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DraftsIcon from "@material-ui/icons/Drafts";
import CallIcon from "@material-ui/icons/Call";
import DuoIcon from "@material-ui/icons/Duo";
import PersonIcon from "@material-ui/icons/Person";
import {
  setComposeMail,
  selectShowInbox,
  selectMailList,
  selectslideBar,
  setSideBar,
} from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const mailList = useSelector(selectMailList);
  // const showInbox = useSelector(selectShowInbox);
  const slideBar = useSelector(selectslideBar);
  const maxHeight = window.innerHeight - 60;
  const showComposeMailBox = () => {
    dispatch(
      setSideBar({
        item: false,
      })
    );
    dispatch(
      setComposeMail({
        composeMail: true,
      })
    );
  };

  return (
    <div
      className={`slidebar ${slideBar && "showSlidebar"}`}
      style={{ height: maxHeight }}
    >
      <div className="composeMail">
        <Button
          className="slidebar_compose"
          startIcon={<AddIcon />}
          onClick={showComposeMailBox}
        >
          COMPOSE
        </Button>
      </div>

      <div className="option_box">
        <SidebarOption
          title="inbox"
          total={mailList.receiveMails.length}
          Icon={InboxIcon}
          selected="allMails"
        />
        <SidebarOption
          title="Starred"
          total={mailList.favMails.length}
          Icon={StarIcon}
          selected="favMails"
        />
        <SidebarOption title="Snoozed" total="0" Icon={WatchLaterIcon} />
        <SidebarOption
          title="Sent"
          total={mailList.sentMails.length}
          Icon={SendIcon}
          selected="sentMails"
        />
        <SidebarOption title="Drafts" total="0" Icon={DraftsIcon} />
        <SidebarOption title="More" total="0" Icon={ExpandMoreIcon} />
      </div>
      <div className="slidebar_footer">
        <div className="footer_element">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <CallIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
