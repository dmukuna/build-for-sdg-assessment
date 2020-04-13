import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import estimatorRoutes from './routes';

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(morgan('dev', { stream: accessLogStream }));

app.use('/api/v1/on-covid-19', estimatorRoutes);

module.exports = app;
