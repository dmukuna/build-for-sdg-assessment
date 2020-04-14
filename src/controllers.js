import xml2js from 'xml2js';
import fs from 'fs';
import estimator from './estimator';

const jsonEstimator = (req, res) => {
  const estimateObj = estimator(req.body);

  res.status(200).json(estimateObj);
};

const xmlEstimator = (req, res) => {
  const estimateObj = estimator(req.body);

  const builder = new xml2js.Builder({
    renderOpts: { pretty: false }
  });

  const xmlOutput = builder.buildObject(estimateObj);

  res.set('Content-Type', 'application/xm');
  res.status(200).send(xmlOutput);
};

const getLogs = (req, res) => {
  fs.readFile('./logs.json', 'utf-8', (e, data) => {
    if (e) throw e;

    const logsArr = JSON.parse(data).logs;

    const newLogsArr = logsArr.map((log) => {
      const {
        method, url, statusCode, processTime
      } = log;
      const formattedTime = (processTime < 10) ? `0${processTime}`.slice(-2) : processTime;
      const unit = 'ms';

      const logString = `${method}  ${url}  ${statusCode} ${formattedTime}${unit}`;
      return logString;
    });

    res.set('Content-Type', 'text/plain');
    const logsStr = newLogsArr.join('\n');
    res.status(200).send(logsStr);
  });
};

export {
  jsonEstimator,
  xmlEstimator,
  getLogs
};
