import React, { useState } from "react";
import LoanIcon from "./LoanIcon";
import ProgressBar from "./ProgressBar";
import LoanType from "./LoanType";
import Modal from "./Modal";
import Notes from "./Notes";

const ListItem = ({ loan, getData }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/loans/${loan.id}`,
        {
          method: "DELETE",
        }
      );
      /*
      const response = await fetch(`http://localhost:8000/loans/${loan.id}`, {
        method: "DELETE",
      });
      */
      if (response.status === 200) {
        console.log("success");
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
