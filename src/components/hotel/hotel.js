import React from "react";
import "./styles.css";
/*import dollar from "../../../public/images/dollar-full.svg";
import dollarEmpty from "../../../public/images/dollar-empty.svg";*/

function Hotel(props) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let fromNatural = new Date(props.availabilityFrom).toLocaleDateString(
    "es-MX",
    options
  );
  let untilNatural = new Date(props.availabilityTo).toLocaleDateString(
    "es-MX",
    options
  );
  function handleClick() {
    alert("Su orden ha sido reservada");
  }
  return (
    <div className="hotel">
      <img
        className="hotelImages"
        width="100%"
        src={props.image}
        alt={props.name}
      />
      <h3 className="title">{props.name}</h3>
      <h6 className="description">{props.description}</h6>
      <div className="locationAndRooms">
        <div className="location">
          <img
            className="locationSVG"
            src="../images/location-svgrepo-com.svg"
            alt="loc"
          />
          <div className="locationProps">
            <h5>{props.city},</h5>
            <h5 className="country">{props.country}</h5>
          </div>
        </div>
        <div className="roomsAndPrice">
          <div className="rooms">
            <img
              className="bedSVG"
              src="../images/bed-svgrepo-com.svg"
              alt="bed"
            />
            <span className="roomsProps">{props.rooms} habitaciones</span>
          </div>
          <span className="price">
            {" "}
            <span>
              <img
                className="priceSVG"
                src={
                  props.price >= 1
                    ? "../images/dollar-full.svg"
                    : "../images/dollar-empty.svg"
                }
                alt=""
              />
            </span>
            <span>
              <img
                className="priceSVG"
                src={
                  props.price >= 2
                    ? "../images/dollar-full.svg"
                    : "../images/dollar-empty.svg"
                }
                alt=""
              />
            </span>
            <span>
              <img
                className="priceSVG"
                src={
                  props.price >= 3
                    ? "../images/dollar-full.svg"
                    : "../images/dollar-empty.svg"
                }
                alt=""
              />
            </span>
            <span>
              <img
                className="priceSVG"
                src={
                  props.price >= 4
                    ? "../images/dollar-full.svg"
                    : "../images/dollar-empty.svg"
                }
                alt=""
              />
            </span>
          </span>
        </div>
        <div className="dates">
          <span className="dateFrom">Desde el {fromNatural}</span>
          <span className="dateFrom dateTo">Hasta el {untilNatural}</span>
        </div>
      </div>
      <button onClick={handleClick} className="buttonHotel">
        Reservar
      </button>
    </div>
  );
}

export default Hotel;
