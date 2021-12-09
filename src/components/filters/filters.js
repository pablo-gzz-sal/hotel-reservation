import "./styles.css";
import { hotelsData } from "../../hotelsData.js";

/* Filters function is exported to App.js. the global states from App.js are received in this function */

let Filters = ({
  country,
  price,
  size,
  from,
  until,
  filterSelected,
  naturalDate
}) => {
  /* funtion selectedFiltered serves as the logic of the various filters. A switch method implemented. Each case refers to the kind of filter that will need to trigger. The function recieves two parameters. filterType will id the which filter the user selected.  "todos" referes to the filter's value before any input from the user. If e.target.value is in fact "todos", it will return the full hotels data. If else, hotelsData will only show the hotels that match with the user's input. All filters are concatenated to ensure that it will not return to the original list if the user uses multiple filters at once. The three parameters that this function will return to App.js are the user's, input, the type of filter selected and the updated list. */

  function selectFiltered(e, filterType) {
    let listUpdated = [];

    switch (filterType) {
      case "Country":
        listUpdated = hotelsData
          .filter((value) => {
            return e.target.value === "todos"
              ? value
              : e.target.value.toLowerCase() === value.country.toLowerCase(); //
          })
          .filter((value) => {
            return price === "todos"
              ? value
              : convertPrice(price) === value.price;
          })
          .filter((value) => {
            return until === false
              ? value
              : convertDateUntil(until) <= value.availabilityTo &&
                  convertDateFrom(until) >= value.availabilityFrom;
          })
          .filter((value) => {
            return from === false
              ? value
              : convertDateFrom(from) >= value.availabilityFrom &&
                  convertDateUntil(from) <= value.availabilityTo;
          });
        break;
      case "Price":
        listUpdated = hotelsData
          .filter((value) => {
            return e.target.value === "todos"
              ? value
              : convertPrice(e.target.value) === value.price;
          })
          .filter((value) => {
            return country === "todos"
              ? value
              : country === value.country.toLowerCase();
          })
          .filter((value) => {
            return until === false
              ? value
              : convertDateUntil(until) <= value.availabilityTo &&
                  convertDateFrom(from) >= value.availabilityFrom;
          })
          .filter((value) => {
            return until === false
              ? value
              : convertDateUntil(until) <= value.availabilityTo &&
                  convertDateFrom(until) >= value.availabilityFrom;
          })
          .filter((value) => {
            return from === false
              ? value
              : convertDateFrom(from) >= value.availabilityFrom &&
                  convertDateUntil(from) <= value.availabilityTo;
          });
        break;
      case "Size":
        listUpdated = convertSize(hotelsData, e.target.value)
          .filter((value) => {
            return country === "todos"
              ? value
              : country === value.country.toLowerCase();
          })
          .filter((value) => {
            return price === "todos"
              ? value
              : convertPrice(price) === value.price;
          })
          .filter((value) => {
            return until === false
              ? value
              : convertDateUntil(until) <= value.availabilityTo &&
                  convertDateFrom(until) >= value.availabilityFrom;
          })
          .filter((value) => {
            return from === false
              ? value
              : convertDateFrom(from) >= value.availabilityFrom &&
                  convertDateUntil(from) <= value.availabilityTo;
          });

        break;
      case "From":
        if (!validateFromDate(e.target.value)) {
          e.preventDefault();
          e.target.value = "";
        }
        if (until) {
          listUpdated = hotelsData
            .filter((value) => {
              return e.target.value === false
                ? value
                : convertDateFrom(e.target.value) >= value.availabilityFrom &&
                    convertDateUntil(e.target.value) <= value.availabilityTo;
            })
            .filter((value) => {
              return until === false
                ? value
                : convertDateUntil(until) <= value.availabilityTo &&
                    convertDateFrom(until) >= value.availabilityFrom;
            })
            .filter((value) => {
              return country === "todos"
                ? value
                : country === value.country.toLowerCase();
            })
            .filter((value) => {
              return price === "todos"
                ? value
                : convertPrice(price) === value.price;
            });
        } else {
          listUpdated = hotelsData;
        }
        break;
      case "Until":
        if (!validateUntilDate(e.target.value)) {
          e.preventDefault();
          e.target.value = "";
        }
        if (!validateFromUntil(e.target.value)) {
          e.preventDefault();
        }
        if (from) {
          listUpdated = hotelsData
            .filter((value) => {
              return e.target.value === false
                ? value
                : convertDateUntil(e.target.value) <= value.availabilityTo &&
                    convertDateFrom(e.target.value) >= value.availabilityFrom;
            })
            .filter((value) => {
              return from === false
                ? value
                : convertDateFrom(from) >= value.availabilityFrom &&
                    convertDateUntil(from) <= value.availabilityTo;
            })
            .filter((value) => {
              return country === "todos"
                ? value
                : country === value.country.toLowerCase();
            })
            .filter((value) => {
              return price === "todos"
                ? value
                : convertPrice(price) === value.price;
            });
        }
        break;
      default:
        listUpdated = hotelsData; // if there's an event trigger but it does not match any filter, it returns the full list. This is for the reset button.
    }
    filterSelected(e.target.value, filterType, listUpdated);
  }

  /* function convertPrice helps to transform the user's input in numbers. This way function selectFiltered can read the values and can make the match with hotelsData. A switch method is once again utilized. */

  function convertPrice(price) {
    let originalPrice = 0;
    switch (price) {
      case "barato":
        originalPrice = 1;
        break;
      case "regular":
        originalPrice = 2;
        break;
      case "caro":
        originalPrice = 3;
        break;
      case "lujoso":
        originalPrice = 4;
        break;
      default:
    }
    return originalPrice;
  }

  /* function convertSize serves the same purpose as the function above. This uses an if condition to determine how will the values be assigned to the user's input. */

  function convertSize(data, rooms) {
    let listUpdate = data;
    if (rooms === "pequeño") {
      listUpdate = data.filter((hotel) => hotel.rooms < 10);
    } else if (rooms === "mediano") {
      listUpdate = data.filter((hotel) => hotel.rooms > 10 && hotel.rooms < 20);
    } else if (rooms === "grande") {
      listUpdate = data.filter((hotel) => hotel.rooms > 20);
    }
    return listUpdate;
  }

  /* function covertDateFrom makes the user's input of the from date to miliseconds and it adds one day. This ensures that if the user selects today it will show the hotels that have availability since today. */

  function convertDateFrom(date) {
    let natDate = new Date(date).valueOf() + 86400000;
    return natDate;
  }

  /* function convertDateUntil is the same as the last function but it does not add an extra day. This is use for the date to input. */

  function convertDateUntil(date) {
    let natDate = new Date(date).valueOf();
    return natDate;
  }

  function validateFromDate(date) {
    let isValidDate = true;

    let fromSelected = Math.floor(new Date(date).getTime() / 1000);
    let todayF = naturalDate(new Date());
    let f = Math.floor(new Date(todayF).getTime() / 1000);
    if (date && fromSelected <= f) {
      isValidDate = false;
      alert(`La fecha inicial no puede ser menor a ${todayF}`);
    }

    return isValidDate;
  }

  function validateUntilDate(date) {
    let isValidDate = true;

    let untilSelected = Math.floor(new Date(date).getTime() / 1000);
    let todayU = naturalDate(new Date());
    let u = Math.floor(new Date(todayU).getTime() / 1000);
    if (date && untilSelected <= u) {
      isValidDate = false;
      alert(`La fecha de regreso no puede ser menor a ${todayU}`);
    }
    return isValidDate;
  }

  function validateFromUntil(date) {
    if (from >= date) {
      alert(
        `ADVERTENCIA: La fecha de regreso tiene que ser posterior a ${from}`
      );
    }
  }

  return (
    <div className="filters">
      <div className="filtersData">
        <div className="fromDate">
          <input
            value={from}
            onChange={(e) => selectFiltered(e, "From")} //the onChange event recieves the user's input and the filter type.
            className="fromDateInput"
            type="date"
          />
        </div>
        <div className="toDate">
          <input
            value={until}
            onChange={(e) => selectFiltered(e, "Until")}
            className="toDateInput"
            type="date"
          />
        </div>
        <div className="countryFilter">
          <select
            value={country}
            onChange={(e) => selectFiltered(e, "Country")}
            className="countryFilterSelect"
          >
            <option value="todos">Todos los países</option>
            <option value="argentina">Argentina</option>
            <option value="brasil">Brasil</option>
            <option value="chile">Chile</option>
            <option value="uruguay">Uruguay</option>
          </select>
        </div>
        <div className="priceFilter">
          <select
            value={price}
            onChange={(e) => selectFiltered(e, "Price")}
            className="priceFilterSelect"
          >
            <option value="todos">Rango de precios</option>
            <option value="barato">$</option>
            <option value="regular">$$</option>
            <option value="caro">$$$</option>
            <option value="lujoso">$$$$</option>
          </select>
        </div>
        <div className="sizeFilter">
          <select
            value={size}
            onChange={(e) => selectFiltered(e, "Size")}
            className="sizeFilterSelect"
          >
            <option value="todos">Escoge un tamaño</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div className="resetButton">
          <button onClick={selectFiltered} className="resetButtonButton">
            {" "}
            <img
              className="trashCan"
              src="../images/trash-can-svgrepo-com (1).svg"
              alt="trashCan"
            />{" "}
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Filters;
