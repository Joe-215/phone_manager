const csv = require('fast-csv');

const mongoose = require('../config/mongoose');

// open mongoose connection
mongoose.connect();

module.exports.importCsv = async (csvFile, headers, Model) => {
  await Model.remove({});

  let rows = 0;

  csv
    .fromPath(csvFile, { headers })
    .on('data', async data => {
      try {
        await Model.create(data);
        rows += 1;
      } catch (error) {
        console.log('Error in importing: ', data);
        console.log(error);
      }
    })
    .on('end', () => {
      console.log(`Imported ${rows} rows`);

      process.exit(0);
    });
};
