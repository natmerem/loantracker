import React from "react";

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
