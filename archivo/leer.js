const XLSX = require('xlsx');
const fs = require('fs');
const workbook = XLSX.readFile('./archivo/huemaps.xlsx');
const sheet = workbook.Sheets['huemaps'];
for (let i = 2; ; i++) { // comienza desde la fila 2
  const cell = sheet[`E${i}`];
  if (!cell) break; // si no hay celda, terminar
  if (cell.t === 'n') {
    const valorEntero = parseInt(cell.v);
    sheet[`E${i}`].v = valorEntero;
    sheet[`E${i}`].t = 'n';
  }
}
for (let i = 2; ; i++) { // comienza desde la fila 2
  const cell = sheet[`J${i}`];
  if (!cell) break; // si no hay celda, terminar
  if (cell.t === 'n') {
    const valorEntero = parseInt(cell.v);
    sheet[`J${i}`].v = valorEntero;
    sheet[`J${i}`].t = 'n';
  }
}
for (let i = 2; ; i++) { // comienza desde la fila 2
  const cell = sheet[`I${i}`];
  if (!cell) break; // si no hay celda, terminar
  if (cell.t === 'n') {
    const valorEntero = parseFloat(cell.v);
    if(valorEntero>0){
      valorEntero = -1 * valorEntero
    }
    sheet[`I${i}`].v = valorEntero;
    sheet[`I${i}`].t = 'n';
  }
}
for (let i = 2; ; i++) { // comienza desde la fila 2
  const cell = sheet[`H${i}`];
  if (!cell) break; // si no hay celda, terminar
  if (cell.t === 'n') {
    const valorEntero = parseFloat(cell.v);
    sheet[`H${i}`].v = valorEntero;
    sheet[`H${i}`].t = 'n';
  }
}


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