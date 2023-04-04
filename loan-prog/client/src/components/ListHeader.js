import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="header-btn" onClick={() => setShowModal(true)}>
          ADD LOAN
        </button>
        <button className="header-btn" onClick={signOut}>
          SIGNOUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
