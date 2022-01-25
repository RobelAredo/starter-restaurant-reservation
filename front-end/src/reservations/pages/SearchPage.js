import React, { useEffect, useState } from "react";
import ReservationsTable from "../ReservationsTable";
import ErrorAlert from "../../layout/ErrorAlert";
import { search } from "../../utils/api";
import { useHistory, useLocation } from "react-router";

export default function SearchPage () {
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

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
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile_number">
          <input name="mobile_number" id="mobile_number" type="text"
          onChange={({target}) => setMobileNumber(target.value)} value={mobileNumber}
          placeholder="Enter a customer's phone number"/>
        </label>
        <button name="submit" type="submit">Find</button>
      </form>
      <br/>
      <ErrorAlert error={error}/>
      {searchResult.length 
        ? <ReservationsTable reservations={searchResult} all={true} setReservationsError={setError}/>
        : "No reservations found"
      }
    </>
  )
}