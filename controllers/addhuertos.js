const { response } = require("express");
const fs = require('fs');

const getHuertos = async (req, res = response) => {
  const ruta = "./archivo/addhuemaps.json";
  try {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    res.send(contenido);
  } catch (error) {
    console.error(`Error al leer el archivo: ${error.message}`);
    res.status(500).send('Error al leer el archivo');
  }

}
const postHuertos = async (req, res = response) => {
  const ruta = "./archivo/addhuemaps.json";
  fs.readFile(ruta, (err, data) => {
    if (err) throw err;
    const usuarios = JSON.parse(data);

    // Trabajar con los datos
    usuarios.push(req.body);
    console.log(usuarios);

    // Escribir los datos actualizados en el archivo JSON
    fs.writeFile(ruta, JSON.stringify(usuarios), (err) => {
      if (err) throw err;
      console.log('Datos actualizados en usuarios.json');
    });
  });

  try {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    res.send(contenido);
  } catch (error) {
    console.error(`Error al leer el archivo: ${error.message}`);
    res.status(500).send('Error al leer el archivo');
  }

}


module.exports = { getHuertos, postHuertos }