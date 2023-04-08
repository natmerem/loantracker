import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

// the modal is a popup form that allows user to create/post new loans or update/edit/put existing loans
// when the submit button at the bottom of the modal window is clicked, changes are made to the loans table of the db
// if the modal is accessed from the edit button included with each loan in the list of loans, the modal will be in edit mode
// if the modal is accessed from the add button included in the header/top of the app, the modal will be in create mode
// see ListItem.js and ListHeader.js for imports and edit/create mode prop. see App.js for loan prop

const Modal = ({ mode, setShowModal, getData, loan }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  
  // if the user is in edit mode, the form inputs should be pre-filled with current values for each loan property
  const [data, setData] = useState({
    //user_email: editMode ? loan.user_email : "xyz@testing.com",
    user_email: editMode ? loan.user_email : cookies.Email,
    loan_name: editMode ? loan.loan_name : "",
    loan_type: editMode ? loan.loan_type : 0,
    progress: editMode ? loan.progress : 1,
    notes: editMode ? loan.notes : "",
  });
  
  // send user inputs, saved as data, to the db thru post request url, see server.js
  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/loans/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("success");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // send user inputs, saved as data, to the db thru put request url, see server.js
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/loans/${loan.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("success");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // when a user makes a change on any of the inputs, they should immediately see that change
  // changes won't register to db until user clicks submit, but still
  // a selected/chnaged value should look like it's been selected/changed
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    //console.log(data);
  };
  // the form the user will see, each input has associated field in loans table of db
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-header">
          <h3>{mode} a loan</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            type="text"
            name="loan_name"
            required
            maxLength={50}
            placeholder="Loan App Name"
            value={data.loan_name}
            onChange={handleChange}
          />
          <br />
          <select
            required
            name="loan_type"
            id="ltype"
            value={data.loan_type}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Loan Type
            </option>
            <option value="1">7a</option>
            <option value="2">504</option>
            <option value="3">Microloan</option>
            <option value="4">Other</option>
          </select>
          <br />
          <label htmlFor="progress">
            Drag slider to indicate current stage of Loan App
          </label>
          <input
            required
            type="range"
            min="1"
            max="8"
            step="1"
            name="progress"
            id="progress"
            value={data.progress}
            list="markers"
            onChange={handleChange}
          />
          <datalist id="markers">
            <option value="1" label="applied"></option>
            <option value="2" label="docs submitted"></option>
            <option value="3" label="processing"></option>
            <option value="4" label="lo review"></option>
            <option value="5" label="approved"></option>
            <option value="6" label="signed"></option>
            <option value="7" label="funds sent"></option>
            <option value="8" label="funds received"></option>
          </datalist>
          <br />
          <label htmlFor="notes">Loan Application Notes</label>
          <textarea
            required
            id="notes"
            name="notes"
            rows="5"
            cols="33"
            value={data.notes}
            onChange={handleChange}
          ></textarea>
          <br />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
