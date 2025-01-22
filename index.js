import fs from 'fs';
import JSONStream from 'JSONStream';

const inputFilePath = 'names.ndjson';
const outputFilePath = 'output.ndjson';

const inputStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
const outputStream = fs.createWriteStream(outputFilePath);

const parseStream = JSONStream.parse();
const transformStream = JSONStream.stringify(false);

inputStream
  .pipe(parseStream)
  .on('data', (data) => {
    data.name = 'Mr.' + data.name;
  })
  .pipe(transformStream)
  .pipe(outputStream);

outputStream.on('finish', () => {
  console.log('NDJSON file processed successfully');
});
