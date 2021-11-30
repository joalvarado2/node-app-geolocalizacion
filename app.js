require("dotenv").config() // paqute para crear variables de entorno

const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

//console.log(process.env);  accediendo a las variables de entorno

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      
      case 1:
        const lugar = await leerInput("Ciudad:");
        await busquedas.ciudad(lugar);

        // buscar los lugares

        // seleccionar el lugar

        //clima

        //Mostrar Resultados
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: ");
        console.log("Lat: ");
        console.log("Lng: ");
        console.log("Tempreatura: ");
        console.log("Minima: ");
        console.log("Maxima: \n");
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};
main();
