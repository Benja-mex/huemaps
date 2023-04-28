require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { data, dataByLocalidad, leerArchivoExcel } = require("../archivo/leer")

class Server {
    constructor(port, ip) {
      this.publicPath = path.resolve(__dirname, 'public');
      this.port = port || process.env.PORT;
      this.ip = ip || process.env.IP;
      this.app = express();
      this.server = http.createServer(this.app);
      
      this.initMiddlewares();
      this.initRoutes();
     
      this.CrearServer();
    }
  
    CrearServer(){
      leerArchivoExcel();
    }
  
    initMiddlewares() {
      
  
  
      this.app.use(bodyParser.json());
      this.app.use(express.static(this.publicPath));
      this.app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");

        res.setHeader('Access-Control-Allow-Methods', ["GET", "PUT","POST","DELETE"]);

        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });
      this.app.use(helmet.xssFilter());
      this.app.use(helmet.frameguard());
      this.app.use(helmet.noSniff());
      this.app.use(helmet.hsts({
        maxAge: 31536000, // 1 año en segundos
        includeSubDomains: true,
        preload: true
      }));
    }
  
    initRoutes() {
      this.app.use("/api/huertos", require("../routes/huertos"));
      this.app.use("/api/addhuertos", require("../routes/addhuertos"));
    }
  

  
    start() {
      this.server.listen(this.port, () => {
        console.log(`Servidor iniciado en http://${this.ip}:${this.port}`);
      });
    }
  }
  
  module.exports = Server;
