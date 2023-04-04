import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import LoanInfo from "./components/LoanInfo";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  //const userEmail = "xyz@testing.com";
  //const authToken = false; //logged in? + jwt stuff
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const [loans, setLoans] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/loans/${userEmail}`
      );
      const jsonres = await response.json();
      setLoans(jsonres);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(loans);
  const sortedLoans = loans?.sort((a, b) => a.progress - b.progress);
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader
            listName={"💸Loan Application Progress Tracker"}
            getData={getData}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              This web app is a personal project, it is NOT associated with the
              SBA.
            </p>
            <p className="user-greeting">hello, {userEmail}!</p>
          </div>
          {sortedLoans?.map((loan) => (
            <ListItem key={loan.id} loan={loan} getData={getData} />
          ))}
          <LoanInfo />
          <hr />
          <p className="copyright">react app by natmerem</p>
        </>
      )}
    </div>
  );
};

export default App;
