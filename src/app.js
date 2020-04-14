import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import estimatorRoutes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  const reqStart = Date.now();

  res.on('finish', () => {
    const { method, url } = req;
    const { statusCode } = res;

    const logObj = {
      method, url, statusCode, processTime: Date.now() - reqStart
    };

    fs.readFile('./logs.json', 'utf-8', (err, data) => {
      if (err) throw err;

      const arrayOfObjects = JSON.parse(data);
      arrayOfObjects.logs.push(logObj);

      fs.writeFile('./logs.json', JSON.stringify(arrayOfObjects), 'utf-8', (e) => {
        if (e) throw e;
      });
    });
  });
  next();
});

app.use(estimatorRoutes);

module.exports = app;
