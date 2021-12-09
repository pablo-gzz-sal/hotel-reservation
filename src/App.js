import "./styles.css";
import React, { useState } from "react";
import Header from "./components/header/header.jsx";
import Filters from "./components/filters/filters.js";
import Hotels from "./components/hotels/hotels.js";
import Footer from "./components/footer/footer.js";
import ErrorMessage from "./components/errorMessage/errorMessage.js";
import { hotelsData } from "./hotelsData.js";

export default function App() {
  const [filteredHotelsList, setFilteredHotelsList] = useState(hotelsData);
  const [country, setCountry] = useState("todos");
  const [size, setSize] = useState("todos");
  const [price, setPrice] = useState("todos");
  const [from, setFrom] = useState(false);
  const [until, setUntil] = useState(false);

  function selectFiltered(filter, filterType, listUpdated) {
    switch (filterType) {
      case "Country":
        setCountry(filter);
        break;
      case "Price":
        setPrice(filter);
        break;
      case "Size":
        setSize(filter);
        break;
      case "From":
        setFrom(filter);
        break;
      case "Until":
        setUntil(filter);
        break;
      default:
        setCountry("todos");
        setPrice("todos");
        setSize("todos");
        setFrom(false);
        setUntil(false);
    }
    setFilteredHotelsList(listUpdated);
  }

  function naturalDate(date) {
    let dateN = new Date(date),
      month = "" + (dateN.getMonth() + 1),
      day = "" + dateN.getDate(),
      year = dateN.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  }

  let emptyMessage = filteredHotelsList.length;

  return (
    <div className="App">
      <Header
        country={country}
        size={size}
        price={price}
        from={from}
        until={until}
      />
      <Filters
        country={country}
        size={size}
        price={price}
        from={from}
        until={until}
        filterSelected={selectFiltered}
        naturalDate={naturalDate}
      />
      {emptyMessage === 0 ? (
        <ErrorMessage />
      ) : (
        <Hotels hotelsList={filteredHotelsList} />
      )}
      <Footer />
    </div>
  );
}
