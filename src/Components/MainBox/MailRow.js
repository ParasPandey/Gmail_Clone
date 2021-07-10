import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./MailRow.css";
import { IconButton } from "@material-ui/core";
// import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenMail,
  selectMailList,
  selectShowInbox,
} from "./../../redux/userSlice";
import { auth, db } from "../../firebase";
import {
  addToFavList,
  removeToFavList,
  createdAt,
} from "./../../utilities/util";

const MailRow = ({ item, index }) => {
  const [netWidth, setNetWidth] = useState(window.innerWidth);
  const history = useHistory();
  const dispatch = useDispatch();
  const mailList = useSelector(selectMailList);
  const showInbox = useSelector(selectShowInbox);

  useEffect(() => {
    setNetWidth(window.innerWidth);
  }, [setNetWidth]);
  const openMail = () => {
    dispatch(
      setOpenMail({
        item,
      })
    );
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var id = doc.id;
          var data = doc.data();
          if (data?.uid === auth?.currentUser?.uid) {
            db.collection("users").doc(id).update({
              openMail: item,
            });
          }
        });
      });
    history.push("/mail");
  };
  const setMailDesc = (l, desc) => {
    const descLen = desc.lengths;
    let netlen;
    if (netWidth > 1000) {
      netlen = (6 / 150) * netWidth;
    } else if (netWidth > 800) {
      netlen = (6 / 170) * netWidth;
    } else if (netWidth > 610) {
      netlen = (9 / 140) * netWidth;
    } else {
      netlen = (9 / 110) * netWidth;
    }
    if (descLen < netlen) {
      return desc;
    } else {
      return desc.substr(0, netlen - l) + "...";
    }
  };

  return (
    <div className="mail_row" onClick={openMail} key={index}>
      <div className="icon_list">
        {/* <Checkbox /> */}
        {showInbox === "favMails" ? (
          <IconButton
            onClick={(e) => removeToFavList(item, dispatch, mailList, e)}
          >
            <StarIcon className="favIcon" />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => addToFavList(item, dispatch, mailList, e)}
          >
            <StarBorderIcon />
          </IconButton>
        )}
      </div>
      <div className="mail_details">
        <div className="mail_author">
          <h4>{item.to_name}</h4>
        </div>
        <div className="about_mail">
          <h4 className="mail_title">
            {item.subject} -{" "}
            <span className="mail_description">
              {setMailDesc(item.subject.length, item.message)}
            </span>
          </h4>
        </div>
      </div>
      <div className="mail_time">
        {/* <p>{item.createdAt}</p> */}
        <p>{createdAt(item.createdAt)}</p>
      </div>
    </div>
  );
};

export default MailRow;
