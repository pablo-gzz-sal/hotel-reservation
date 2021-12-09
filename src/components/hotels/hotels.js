import React from "react";
import "./styles.css";
import Hotel from "../hotel/hotel";

function Hoteles(props) {
  return (
    <div className="results">
      {props.hotelsList.map((hotel, index) => {
        return (
          <div className="hoteles">
            <Hotel
              name={hotel.name}
              city={hotel.city}
              country={hotel.country}
              image={hotel.photo}
              description={hotel.description}
              rooms={hotel.rooms}
              price={hotel.price}
              availabilityFrom={hotel.availabilityFrom}
              availabilityTo={hotel.availabilityTo}
              key={index}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Hoteles;
