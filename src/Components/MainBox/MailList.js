import React from "react";
import MailRow from "./MailRow";

const MailList = ({ data }) => {
  return (
    <div className="mailList">
      {data.length > 0 ? (
        data?.map((item, index) => {
          return <MailRow index={index} item={item} key={index} />;
        })
      ) : (
        <h4 className="no_mail">No Mail</h4>
      )}
    </div>
  );
};

export default MailList;
