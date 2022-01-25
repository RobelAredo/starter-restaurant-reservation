import React, { useState } from "react";
import ReservationsTable from "../ReservationsTable";
import ErrorAlert from "../../layout/ErrorAlert";
import { search } from "../../utils/api";

export default function SearchPage () {
  const [mobile_number, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();
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

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile_number">
          <input name="mobile_number" id="mobile_number" type="text"
          onChange={({target}) => setMobileNumber(target.value)} value={mobile_number}
          placeholder="Enter a customer's phone number"/>
        </label>
        <button name="submit" type="submit">Find</button>
      </form>
      <br/>
      {searchResult.length 
        ? <ReservationsTable reservations={searchResult} all={true}/>
        : "No reservations found"
      }
      <ErrorAlert error={error}/>
    </>
  )
}