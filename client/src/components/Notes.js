import React from "react";
// loan notes, something the user indicates when they create/edit loans, stored in loans table of db
// the loan notes is passed as a prop from App.js to this component, thru the ListItem component
// the loan notes is a popup/modal that is accessed by button click, included for each loan in the list of loans, see ListItem.js for import
const Notes = ({ loan, setShowNotes }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-header">
          <h3>Loan Application Notes</h3>
          <button onClick={() => setShowNotes(false)}>X</button>
        </div>
        <div className="vnotesbox">
          <p id="vnotes">{loan.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
