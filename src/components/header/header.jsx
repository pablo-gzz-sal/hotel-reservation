import "./styles.css";

let Header = ({ country, price, size, from, until }) => {
  /* This logic makes the user´s input of both dates readable. "T00:00:00" corrects the one day off */
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let fromNatural = new Date(from + "T00:00:00").toLocaleDateString(
    "es-MX",
    options
  );
  let untilNatural = new Date(until + "T00:00:00").toLocaleDateString(
    "es-MX",
    options
  );

  return (
    <div className="header">
      <h1 className="title">Hoteles</h1>
      <img className="logo" src="./images/hotelroom_thumb900.png" alt="logo" />
      <div className="subtitles">
        <h3>País seleccionado: {country}</h3>
        <h3>Precio selecciando: {price}</h3>
        <h3>Tamaño seleccionado: {size}</h3>
        <div className="dat">
          {from ? <h3>Desde el {fromNatural}</h3> : ""}
          {until ? <h3>Hasta el {untilNatural}</h3> : ""}
        </div>
      </div>
    </div>
  );
};

export default Header;
