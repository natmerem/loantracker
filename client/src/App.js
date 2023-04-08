//useState - save variables to app, vars that will change depending on user interactions
//useEffect - run some code after rendering, synchronize component to external system
import { useEffect, useState } from "react";
// store jwt, email as browser cookies to facilitate user-specific app usage
import { useCookies } from "react-cookie";
// piece together the app by piecing together the components
// some components are composed of other components not imported here
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import LoanInfo from "./components/LoanInfo";

const App = () => {
  // store jwt, email as browser cookies to facilitate user-specific app usage
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  // get/read loans for a user by using request url defined in server.js
  // save using useState
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
  
  // no loans unless user is signed in
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(loans);
  const sortedLoans = loans?.sort((a, b) => a.progress - b.progress);
  // everything here, App, injected into root div of index.html
  // loan info sent as props to components, components html designate how that info should be formatted/rendered
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
              This web app is a personal project, it is not associated with the
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
