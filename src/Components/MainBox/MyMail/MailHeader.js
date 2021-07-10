import React from "react";
import "./MailHeader.css";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import MailIcon from "@material-ui/icons/Mail";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { selectmail, selectMailList } from "./../../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteMail } from "./../../../utilities/util";

const MailHeader = () => {
  const deletedMail = useSelector(selectmail);
  const mailList = useSelector(selectMailList);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="mail_header">
      <div className="left_headerbox">
        <IconButton onClick={() => history.push("/")} className="main_icon">
          <ArrowBackIcon />
        </IconButton>
        <IconButton>
          <ArchiveIcon className="main_icon" />
        </IconButton>
        <IconButton>
          <ReportIcon />
        </IconButton>
        <IconButton
          className="main_icon"
          onClick={(e) =>
            deleteMail(deletedMail.uuid, dispatch, mailList, e, history)
          }
        >
          <DeleteIcon />
        </IconButton>
        <IconButton className="main_icon">
          <MailIcon />
        </IconButton>
        <IconButton>
          <WatchLaterIcon />
        </IconButton>
        <IconButton>
          <CheckCircleIcon />
        </IconButton>
        <IconButton className="main_icon">
          <LabelImportantIcon />
        </IconButton>
        <IconButton className="main_icon">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="right_headerbox">
        <IconButton>
          <UnfoldMoreIcon />
        </IconButton>
        <IconButton>
          <PrintIcon />
        </IconButton>
        <IconButton>
          <OpenInNewIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MailHeader;
