import React, { useEffect, useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { listAvailable } from "../../utils/api";
import SelectionOptions from "../SelectionOptions";
const img = require("../../images/the-periodic-table.jpg").default;

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
    <div className="table-selection">
      <nav className="side-bar secondary py-3 px-0 mx-0">
        <h1 className="text-warning">Select Table</h1>
      </nav>
      <div className="card-bg four">
        <ErrorAlert error={listError} />
          <div className="card bg-light" style={{width:"90%"}}>
            <div>
              <div className="p-3 d-flex justify-content-center">
                <SelectionOptions tableList={tableList} setError={setListError}/>
              </div>
              <img className="card-img table"  src={img} alt="Card cap"/>
            </div>
        </div>
      </div>
    </div>
  )
}