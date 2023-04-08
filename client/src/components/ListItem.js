import React, { useState } from "react";
// the listitem component is composed of other components
// each loan in the list of loans has a loan icon, a porgress stage, a type, a edit button/modal access notes
import LoanIcon from "./LoanIcon";
import ProgressBar from "./ProgressBar";
import LoanType from "./LoanType";
import Modal from "./Modal";
import Notes from "./Notes";

// each loan in the user specific list of loans is mapped to a individual list item
// see App.js for loan prop
const ListItem = ({ loan, getData }) => {
  // by default, the notes and modal popups are not shown
  const [showNotes, setShowNotes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // if the user clicks the delete button, the loan is deleted by using the delete request url, see server.js
  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/loans/${loan.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        console.log("success");
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  // loan data from App.js gets sent to the components that make up the ListItem component
  // show modal or notes popup when associated button is clicked
  return (
    <li className="list-item">
      <div className="info-container">
        <LoanIcon />
        <p className="loan-name">{loan.loan_name}</p>
        <div className="loan-type">
          <LoanType ltype={loan.loan_type} />
        </div>
        <ProgressBar progress={loan.progress} />
      </div>
      <div className="button-container">
        <button className="notes" onClick={() => setShowNotes(true)}>
          NOTES
        </button>
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showNotes && <Notes loan={loan} setShowNotes={setShowNotes} />}
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          loan={loan}
        />
      )}
    </li>
  );
};

export default ListItem;
