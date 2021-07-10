import React, { useState, useEffect } from "react";
import "./MainBox.css";
import MainHeader from "./MainHeader";
import InboxIcon from "@material-ui/icons/Inbox";
import GroupIcon from "@material-ui/icons/Group";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Section from "./Section";
import MailList from "./MailList";
import ComposeMail from "../ComposeMail/ComposeMail";
import {
  selectComposeMail,
  selectMailList,
  selectShowInbox,
  selectMailObj,
} from "../../redux/userSlice";
import { useSelector } from "react-redux";

const MainBox = () => {
  const mailList = useSelector(selectMailList);
  const composeMail = useSelector(selectComposeMail);
  const showInbox = useSelector(selectShowInbox);
  const showMailObj = useSelector(selectMailObj);

  const [showComposeMail, setShowComposeMail] = useState(false);
  const [mailListData, setMailListData] = useState("");

  // const dispatch = useDispatch();

  useEffect(() => {
    setShowComposeMail(composeMail);
  }, [showComposeMail, composeMail]);

  useEffect(() => {
    if (showInbox === "allMails") {
      setMailListData(mailList.receiveMails);
    }
    if (showInbox === "sentMails") {
      setMailListData(mailList.sentMails);
    }
    if (showInbox === "favMails") {
      setMailListData(mailList.favMails);
    }
  }, [showInbox, mailList.receiveMails, mailList.sentMails, mailList.favMails]);

  return (
    <div className="mainbox">
      <MainHeader />
      <div className="mainbox_section">
        <Section name="Primary" color="red" Icon={InboxIcon} selected />
        <Section name="Social" color="#3C87E9" Icon={GroupIcon} />
        <Section name="Promotion" color="#188038" Icon={LocalOfferIcon} />
      </div>
      <MailList data={mailListData} />
      {showComposeMail && (
        <ComposeMail
          mail={showMailObj.mailTo}
          subject={showMailObj.subject}
          body={showMailObj.body}
        />
      )}
    </div>
  );
};

export default MainBox;
