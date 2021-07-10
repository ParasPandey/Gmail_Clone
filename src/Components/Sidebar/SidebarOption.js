import React from "react";
import "./SidebarOption.css";
import { setInbox, selectShowInbox, setSideBar } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarOption = ({ title, total, Icon, selected }) => {
  // const [mailType, setMailType] = useState("");
  const showInbox = useSelector(selectShowInbox);
  const dispatch = useDispatch();
  const setInboxMails = () => {
    dispatch(
      setSideBar({
        item: false,
      })
    );
    if (title === "inbox") {
      dispatch(
        setInbox({
          inbox: "allMails",
        })
      );
    } else if (title === "Sent") {
      dispatch(
        setInbox({
          inbox: "sentMails",
        })
      );
    } else if (title === "Starred") {
      dispatch(
        setInbox({
          inbox: "favMails",
        })
      );
    }
  };
  return (
    <div
      className={`sidebar_options ${selected === showInbox && "option_active"}`}
      onClick={setInboxMails}
    >
      <Icon />
      <h4>{title}</h4>

      <p>{total}</p>
    </div>
  );
};

export default SidebarOption;
