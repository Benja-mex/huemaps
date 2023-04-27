const { response } = require("express");
const fs = require('fs');

const getHuertos = async (req, res = response) => {
    const ruta = "./archivo/huemaps.json";
    try {
        const contenido = fs.readFileSync(ruta, 'utf-8');
        res.send(contenido);
      } catch (error) {
        console.error(`Error al leer el archivo: ${error.message}`);
        res.status(500).send('Error al leer el archivo');
      }
    

}


module.exports = {getHuertos}