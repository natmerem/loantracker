import React from "react";
// loan stage/progress, something the user indicates when they create/edit loans, stored in loans table of db
// the loan progress is passed as a prop from App.js to this component, thru the ListItem component
// the loan progress is included for each loan in the list of loans, see ListItem.js for import
const ProgressBar = ({ progress }) => {
  const calcProg = (progress / 8) * 100;
  return (
    <div className="outer-bar">
      <div className="inner-bar" style={{ width: `${calcProg}%` }}></div>
    </div>
  );
};

export default ProgressBar;
