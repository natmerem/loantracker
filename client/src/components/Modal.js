import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, loan }) => {
  //const mode = "create";
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [data, setData] = useState({
    //user_email: editMode ? loan.user_email : "xyz@testing.com",
    user_email: editMode ? loan.user_email : cookies.Email,
    loan_name: editMode ? loan.loan_name : "",
    loan_type: editMode ? loan.loan_type : 0,
    progress: editMode ? loan.progress : 1,
    notes: editMode ? loan.notes : "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

    //console.log(data);
  };
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
