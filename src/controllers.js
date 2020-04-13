import xml2js from 'xml2js';
// import xml from 'xml';
import fs from 'fs';
import path from 'path';
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

  res.set('Content-Type', 'text/xml');
  res.status(200).send(xmlOutput);
};

const getLogs = (req, res) => {
  res.set('Content-Type', 'text/plain');

  const staticBasePath = './';
  let fileLoc = path.resolve(staticBasePath);
  fileLoc = path.join(fileLoc, 'access.log');

  fs.readFile(fileLoc, (e, data) => {
    if (e) throw e;
    res.send(data);
  });
};

export {
  jsonEstimator,
  xmlEstimator,
  getLogs
};
