import React, { useState } from "react";
import "./ComposeMail.css";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MinimizeIcon from "@material-ui/icons/Minimize";
import ClearIcon from "@material-ui/icons/Clear";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  selectuser,
  setComposeMail,
  addSendMail,
  setMailObj,
} from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "emailjs-com";
import { db, auth } from "./../../firebase";

const ComposeMail = ({ mail, subject, body }) => {
  const [mailTo, setMailTo] = useState(mail);
  const [mailSubject, setMailSubject] = useState(subject);
  const [mailBody, setMailBody] = useState(body);
  const user = useSelector(selectuser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // console.log(user);
      const dataObject = {
        from_name: user.name,
        from_mail: user.email,
        to_name: data.email,
        message: data.messageBody,
        subject: data.subject,
        to_mail: data.email,
        reply_to: data.email,
        createdAt: new Date().toLocaleString(),
        isFav: false,
        uuid: uuidv4(),
      };
      const result = await emailjs.send(
//      your emailjs service id,
//      your emailjs template id,
        dataObject,
//      your emailjs user id
      );
      db.collection("users")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var id = doc.id;
            var data = doc.data();
            if (data?.uid === auth?.currentUser?.uid) {
              db.collection("users")
                .doc(id)
                .update({
                  sendMails: [
                    {
                      ...dataObject,
                    },
                    ...data.sendMails,
                  ],
                });
            }
          });
        });
      console.log(result);

      disableComposeMail();
      dispatch(
        addSendMail({
          mail: dataObject,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const disableComposeMail = () => {
    dispatch(
      setMailObj({
        mailObj: {
          mailTo: "",
          subject: "",
          body: "",
        },
      })
    );
    dispatch(
      setComposeMail({
        composeMail: false,
      })
    );
  };

  const uplodeFile = (e) => {
    console.log(e);
  };
  const minimiseComposeBox = () => {
    const box = document.querySelector(".compose_mail");
    box.classList.toggle("smaallSizeBox");
  };
  const changeEmailInput = (e) => {
    if (e.target.localName === "textarea") {
      setMailBody(e.target.value);
    } else if (e.target.localName === "input" && e.target.name === "email") {
      setMailTo(e.target.value);
    } else if (e.target.localName === "input" && e.target.name === "subject") {
      setMailSubject(e.target.value);
    }
  };
  return (
    <div className="compose_mail">
      <div className="compose_mail_header">
        <div className="left_compose_mail_header">
          <h4>New Message</h4>
        </div>
        <div className="right_compose_mail_header">
          <IconButton
            className="compose_mail_header_icons"
            onClick={minimiseComposeBox}
          >
            <MinimizeIcon />
          </IconButton>
          <IconButton
            className="compose_mail_header_icons"
            onClick={disableComposeMail}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={(e) => changeEmailInput(e)}
      >
        {/* <form> */}
        <input
          type="email"
          placeholder="To"
          // value=""
          value={mailTo}
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="form_errors">Email is required</p>
        )}
        <input
          type="text"
          placeholder="Subject"
          value={mailSubject}
          {...register("subject", { required: true })}
        />
        {errors.subject?.type === "required" && (
          <p className="form_errors">Subject is required</p>
        )}
        <textarea
          type="text"
          className="compose_mail_body"
          cols="30"
          rows="10"
          value={mailBody}
          {...register("messageBody", { required: true })}
        ></textarea>

        {errors.messageBody?.type === "required" && (
          <p className="form_errors">Body is required</p>
        )}
        <div className="form_submitOption">
          <div className="left_submitOption">
            <Button
              variant="contained"
              type="submit"
              // onClick={(e) => onSubmit(e)}
            >
              Sent
            </Button>
            <FormatColorTextIcon />
            <div className="inputFile show_form_icon">
              <label htmlFor="file-input">
                <AttachFileIcon className="show_form_icon" />
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => uplodeFile(e)}
              />
            </div>

            <InsertLinkIcon className="show_form_icon" />
            <InsertEmoticonIcon />
            <InsertDriveFileIcon className="show_form_icon" />
            <InsertPhotoIcon className="show_form_icon" />
          </div>
          <div className="right_submitOption">
            <MoreVertIcon className="show_form_icon" />
            <DeleteIcon className="show_form_icon delete_icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
