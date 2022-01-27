import React, { useEffect, useState } from "react";
import ReservationsTable from "../ReservationsTable";
import ErrorAlert from "../../layout/ErrorAlert";
import { search } from "../../utils/api";
import { useHistory, useLocation } from "react-router";
const pancakes = require("../../images/pancakes.jpg").default;

export default function SearchPage () {
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const picStyle = {
    display: "block",
    width: "100vw",
    height: "100vh",
    "object-fit": "cover",
  }

  const history = useHistory();
  const mobile_numberQuery = useLocation().search.split("=")
  const mobile_number = mobile_numberQuery && mobile_numberQuery[0].match(/\?mobile_number/) ? mobile_numberQuery[1] : "";

  useEffect(loadCustomers, [mobile_number])

  function loadCustomers () {
    const ac = new AbortController();

    const findCustomers = async () => {
      try {
        const customers = await search(mobile_number, ac.signal);
        setSearchResult(customers);
        setMobileNumber("");
      } catch (error) {
        setSearchResult(null);
        setError(error);
      }
    }
    findCustomers();
    return () => ac.abort();
  }

  function submitHandler (event) {
    event.preventDefault();
    history.push(`/search?mobile_number=${mobileNumber}`);
  }

  return (
    <>
      <nav className="row side-bar secondary py-3">
        <form className="pl-0 col form-inline justify-content-center justify-content-md-start" onSubmit={submitHandler}>
            <label className=" mb-0 my-0" htmlFor="mobile_number"></label>
            <input className="form-control col-4 search mr-3" name="mobile_number" id="mobile_number" type="text"
            onChange={({target}) => setMobileNumber(target.value)} value={mobileNumber}
            placeholder="Enter a customer's phone number"/>
          <button className="btn col-1 btn-outline-warning" name="submit" type="submit">Find</button>
        </form>
      </nav>
      <div className="row d-flex flex-nowrap justify-content-between">
        <div className="bg-light">
          <ErrorAlert error={error}/>
          {searchResult.length 
            ? <ReservationsTable reservations={searchResult} all={true} setReservationsError={setError}/>
            : <h2 className="m-4 text-warning">No reservations found</h2>
          }
        </div>
        <img alt="pancakes and coffee" style={picStyle} src={pancakes} className="col-6 px-0"/>
      </div>
    </>
  )
}