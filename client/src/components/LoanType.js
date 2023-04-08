import React from "react";
// loan type, something the user indicates when they create/edit loans, stored in loans table of db
// the loan type (ltype) is passed as a prop from App.js to this component, thru the ListItem component
// the loan type is included for each loan in the list of loans, see ListItem.js for import
const LoanType = ({ ltype }) => {
  const linfo = [];
  if (ltype === 1) {
    linfo.push(
      <p key={ltype}>
        7a{" "}
        <span className="info-links">
          <a href="#sevena">View Info</a>
        </span>
      </p>
    );
  } else if (ltype === 2) {
    linfo.push(
      <p key={ltype}>
        504{" "}
        <span className="info-links">
          <a href="#fiveohfour">View Info</a>
        </span>
      </p>
    );
  } else if (ltype === 3) {
    linfo.push(
      <p key={ltype}>
        Microloan{" "}
        <span className="info-links">
          <a href="#microloan">View Info</a>
        </span>
      </p>
    );
  } else {
    linfo.push(
      <p key={ltype}>
        Other{" "}
        <span className="info-links">
          <a href="#other">View Info</a>
        </span>
      </p>
    );
  }
  return <>{linfo}</>;
};

export default LoanType;
