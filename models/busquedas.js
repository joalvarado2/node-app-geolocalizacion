const fs = require("fs");

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "db/database.json";

  constructor() {
    // todo: leer db si existe
    this.leerDB();
  }

  get historialCapitalizado(){
    // capitalizar cada palabra
    return this.historial.map(lugar => {
      let palabras = lugar.split(" ");
      palabras = palabras.map(p => p[0].toUpperCase() +  p.substring(1));

      return palabras.join(" ");
    });
  }

  get paramMapbox() {
    return {
      language: "es",
      limit: 5,
      access_token: process.env.MAPBOX_KEY, // variable de entorno creda con el pack dotenv
    };
  }

  get paramsClima() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion Http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramMapbox,
      });
      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // instance axios.create()
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsClima, lat, lon },
      });

      //resp.data
      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        decs: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log("no me pude conectar");
    }
  }

  agregarHistorial(lugar = "") {
    // Todo: prevenir duplicados
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0,5);
    
    this.historial.unshift(lugar.toLocaleLowerCase());

    // Grabar db
    this.guardarDB();

    // Leer db
    this.leerDB();
  }

  guardarDB() {
    const payLoad = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
  }

  leerDB() {
    if(!fs.existsSync(this.dbPath)) return null;

    const info = fs.readFileSync(this.dbPath, {encoding: "utf-8"});
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
