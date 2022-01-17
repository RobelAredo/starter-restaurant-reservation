import React from "react";

export default function Alert ({errorMessage}) {
  return !errorMessage || (
  <>
    <br/>
    <div className="alert alert-danger">
      {errorMessage}
    </div>
  </>
  )
}