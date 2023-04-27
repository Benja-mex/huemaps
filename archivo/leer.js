const XLSX = require('xlsx');
const fs = require('fs');
const workbook = XLSX.readFile('./archivo/huemaps.xlsx');
const sheet = workbook.Sheets['huemaps'];
const data = XLSX.utils.sheet_to_json(sheet);

const dataByLocalidad = data.reduce((acc, curr) => {
  const localidad = curr.LOCALIDAD;
  if (!acc[localidad]) {
    acc[localidad] = [];
  }
  acc[localidad].push(curr);
  return acc;
}, {});

const leerArchivoExcel = () => {

  //console.log(data); // ejemplo de lo que puedes hacer con los datos
  //const filteredData = data.filter((item) => item.REG_SADER.includes('HUE0816102'));

  // Obtener los valores únicos de la propiedad LOCALIDAD
  //const uniqueLocalidades = [...new Set(filteredData.map((item) => item.LOCALIDAD.toUpperCase()))];

  // Recorrer cada localidad y guardar sus datos en un archivo JSON
  //for (const localidad of uniqueLocalidades) {
  //  let localidadNombre = localidad;
  //  if (localidadNombre === "S/N") {
  //    localidadNombre = "SIN NOMBRE";
  //  }
  //  if(localidadNombre == "LIBRAMIENTO OTE. S\N"){
  //    localidadNombre = "LIBRAMIENTO OTE. S/N"
  //  }
  //
  //   Filtrar los datos por la localidad actual
  //  const filteredDataByLocalidad = filteredData.filter((item) => item.LOCALIDAD.toUpperCase() === localidad);
  //
  // Crear un objeto con los datos filtrados y guardarlos en un archivo JSON
  const dataByLocalidad = { huertos: data };

  const ruta = `./archivo/huemaps.json`;
  if (fs.existsSync(ruta)) {

  } else {
    
    fs.writeFile(ruta, JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log(`Archivo ${ruta} guardado exitosamente`);
    });
  }
}





module.exports = {
  data,
  dataByLocalidad,
  leerArchivoExcel
}