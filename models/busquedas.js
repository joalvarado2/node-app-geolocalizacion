const axios = require("axios");

class Busquedas {
  historial = ["bogota", "medellin", "cali"];

  constructor() {
    // todo: leer db si existe
  }

  get paramMapbox() {
    return {
      language: "es",
      limit: 5,
      access_token: process.env.MAPBOX_KEY, // variable de entorno creda con el pack dotenv
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
      console.log(resp.data);

      return []; // retorna los lugares
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
