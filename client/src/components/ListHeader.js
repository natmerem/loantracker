import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  // by default, the modal popup is not shown
  const [showModal, setShowModal] = useState(false);
  // no user email cookie, no loan list. no auth token cookie, get sent back to sign in page
  const [cookies, setCookie, removeCookie] = useCookies(null);
  
  // function triggered if user clicks sign out button
  // remove cookies, reload page, user will see the sign in page
  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  // click the add loan button and the modal popup will be displayed
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
