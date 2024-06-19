import express from 'express';
import App from './src/routes/index.js';
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.disable('x-powered-by');
server.use(App);

const PORT = process.env.STATUS_CODE || 3000;

server.listen(PORT, () => console.log(`SERVER SEDANG BERJALAN DI PORT ${PORT}`));