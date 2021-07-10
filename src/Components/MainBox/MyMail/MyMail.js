import React from "react";
import MailHeader from "./MailHeader";
import MailBody from "./MailBody";
import { selectmail } from "./../../../redux/userSlice";
import { useSelector } from "react-redux";

import "./MyMail.css";

const MyMail = () => {
  const selectedMail = useSelector(selectmail);
  return (
    <div className="myMail">
      <MailHeader />
      <MailBody item={selectedMail} />
    </div>
  );
};

export default MyMail;
