import React from "react";
import "./MailBody.css";
import { IconButton } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ForwardIcon from "@material-ui/icons/Forward";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMailList,
  selectuser,
  setMailObj,
  setComposeMail,
} from "../../../redux/userSlice";
import { useHistory } from "react-router-dom";
import { addToFavList, createdAt } from "./../../../utilities/util";
import Avatar from "@material-ui/core/Avatar";

const MailBody = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const maxHeight = window.innerHeight - 150;
  const history = useHistory();
  const mailList = useSelector(selectMailList);

  const replyTo = () => {
    dispatch(
      setMailObj({
        mailObj: {
          mailTo: item?.reply_to,
          subject: "",
          body: "",
        },
      })
    );
    dispatch(
      setComposeMail({
        composeMail: true,
      })
    );
    history.push("/");
  };
  const forwordTo = () => {
    dispatch(
      setMailObj({
        mailObj: {
          mailTo: "",
          subject: item?.subject,
          body: item?.message,
        },
      })
    );
    dispatch(
      setComposeMail({
        composeMail: true,
      })
    );
    history.push("/");
  };
  return (
    <div className="mailbody" style={{ minHeight: maxHeight }}>
      <div className="mailbody_header">
        <h2>{item?.subject}</h2>
      </div>
      <div className="main_body">
        <div className="main_body_header">
          <div className="leftside_header">
            <IconButton className="avatar">
              <Avatar src={user.photo} alt="userpic.jpg" />
            </IconButton>

            {/* userName */}
            <div className="mail_profile">
              <h4>{item?.from_name}</h4>
              <p>to {item?.to_mail.split("@")[0]}</p>
            </div>

            {/* email id */}
            {/* <h5>{item?.from_email}</h5> */}
          </div>
          <div className="rightside_header">
            {/* time of mail */}
            <p>{createdAt(item?.createdAt)}</p>
            <IconButton onClick={() => addToFavList(item, dispatch, mailList)}>
              <StarBorderIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="main_body_message">
          <div className="body_message_greeting">
            <p className="name">
              Hello,
              <strong>{item?.to_mail}</strong>
            </p>
            <p className="greet">
              You got a now message from <strong>{item?.from_name}</strong>{" "}
            </p>
          </div>
          <div className="body_message_text">{item?.message}</div>

          <div className="rnf_button">
            <Button variant="outlined" size="medium" onClick={replyTo}>
              <ReplyIcon />
              Reply
            </Button>
            <Button variant="outlined" size="medium" onClick={forwordTo}>
              <ForwardIcon />
              Forward
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBody;
