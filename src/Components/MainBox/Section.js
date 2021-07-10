import React from "react";
import "./Section.css";
// import { IconButton } from "@material-ui/core";

const Section = ({ name, color, Icon, selected }) => {
  return (
    <div
      className={`each_section ${selected && "active_section"}`}
      style={{
        borderBottom: `3px solid ${color}`,
        color: `${selected && color}`,
      }}
    >
      <Icon />
      <h4>{name}</h4>
    </div>
  );
};

export default Section;
