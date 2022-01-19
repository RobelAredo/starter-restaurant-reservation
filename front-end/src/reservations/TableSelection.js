import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listAvailable } from "../utils/api";
import SelectionOptions from "./SelectionOptions";

export default function TableSelection () {

  const [tableList, setTableList] = useState([]);
  const [listError, setListError] = useState(null);

  useEffect(loadAvailableTables, []);

  function loadAvailableTables () {
    const ac = new AbortController();
    setListError(null);
    listAvailable(ac.signal)
      .then(setTableList)
      .catch(setListError);

    return () => ac.abort();
  }

  return (
    <>
      <ErrorAlert error={listError} />
      <SelectionOptions tableList={tableList}/>
    </>
  )
}