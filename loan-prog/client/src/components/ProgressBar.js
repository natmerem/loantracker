import React from "react";

const ProgressBar = ({ progress }) => {
  const calcProg = (progress / 8) * 100;
  return (
    <div className="outer-bar">
      <div className="inner-bar" style={{ width: `${calcProg}%` }}></div>
    </div>
  );
};

export default ProgressBar;
