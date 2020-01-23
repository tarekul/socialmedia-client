import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  buttonDisable = false
}) => (
  <Tooltip title={tip} className={tipClassName}>
    <span>
      <IconButton
        onClick={onClick}
        className={btnClassName}
        disabled={buttonDisable}
      >
        {children}
      </IconButton>
    </span>
  </Tooltip>
);
