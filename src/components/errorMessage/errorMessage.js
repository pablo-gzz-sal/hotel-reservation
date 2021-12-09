import React from "react";
import "./styles.css";

function ErrorMessage() {
  return (
    <div className="nothing">
      <img
        className="nothingSVG"
        src="./images/sad-face.svg"
        alt="sad face"
      ></img>
      <h1>
        Lo sentimos, no encontramos ningún hotel con los filtros seleccionados
      </h1>
    </div>
  );
}

export default ErrorMessage;
